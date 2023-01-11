import {
    faEllipsisVertical,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteCard, getMyCards } from '../../data/cardStorage';
import CardDetails from './CardDetails';
import CardSettingsDropdown from './CardSettingsDropdown';

export default function ShowMyCards() {
    const [myCards, setMyCards] = useState([]);
    const { token } = useContext(UserTokenContext);
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserInfoContext);
    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState(null);
    let menuRef = useRef();
    const userId = user?._id;

    const parseDateString = (dateString) => {
        const [date, time] = dateString.split(', ');
        const [day, month, year] = date.split('/');
        const [hour, minute, second] = time.split(':');
        return new Date(year, month - 1, day, hour, minute, second);
    };
    const sortedCards = myCards.sort((a, b) => {
        const dateA = parseDateString(a.businessCreateDate);
        const dateB = parseDateString(b.businessCreateDate);
        return dateB - dateA;
    });

    useEffect(() => {
        reRender();
    }, []);

    useEffect(() => {
        let handler = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                document.getElementById('card-num: ' + openId) &&
                !document
                    .getElementById('card-num: ' + openId)
                    .contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    });

    function onDeleteClick(id) {
        deleteCard(id, token)
            .then((res) => {
                reRender();
            })
            .catch((error) => console.error(error));
    }

    function reRender() {
        getMyCards(token, userId)
            .then((res) => {
                console.log(res);
                setMyCards([...res]);
            })
            .catch((error) => console.log(error.message));
    }

    if (myCards.length == 0) {
        return (
            <div className={`not-found-container body-${theme} d-grid `}>
                <div
                    className={`not-found-content-container components-${theme}`}
                >
                    <div className={`not-found-content `}>
                        <h1>No Cards</h1>
                        <p>Time to create a new Card!</p>
                    </div>
                </div>
            </div>
        );
    }

    const getColumnsForRow = () => {
        let drawCards = sortedCards.map((c, i) => {
            return (
                <div key={i} className={`cards-col`}>
                    {/* Container */}
                    <div
                        className={`card-container business-cards-${theme}`}
                        key={c._id}
                    >
                        {/* Image */}
                        <div
                            className={`card-image business-cards-image-${theme}`}
                            style={{
                                backgroundImage: `url(${
                                    c.businessImage ===
                                    'businessDefaultCardImage'
                                        ? businessDefaultCardImage
                                        : c.businessImage
                                })`,
                            }}
                        ></div>
                        {/* Title */}
                        <div
                            className={`card-title-container card-title-container-${theme}`}
                        >
                            <div className={`card-title ps-3 pe-1 pt-2`}>
                                <div className={`business-title`}>
                                    <h2>{c.businessName}</h2>
                                    <h3>{c.cardEditor}</h3>
                                </div>
                                <div
                                    ref={menuRef}
                                    id={'card-num: ' + i}
                                    className={`card-settings`}
                                >
                                    <div
                                        className={`menu-trigger`}
                                        onClick={() => {
                                            setOpen(!open);
                                            setOpenId(i);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                            className={`card-settings-dot ellipsis-${theme}`}
                                        ></FontAwesomeIcon>
                                    </div>

                                    <div
                                        className={`dropdown-menu-custom  dropdown-menu-box-${theme}  ${
                                            open && openId === i
                                                ? 'active'
                                                : 'inactive'
                                        } `}
                                    >
                                        <ul>
                                            <CardSettingsDropdown
                                                card={c}
                                                onDelete={onDeleteClick}
                                                setOpen={setOpen}
                                            />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`card-content `}>
                            <div className={`last-updated mx-2`}>
                                <small>
                                    Last updated: {c.businessCreateDate}
                                </small>
                            </div>
                            <div className={`description my-2 mx-2`}>
                                {c.businessDescription}
                            </div>

                            <div className={`phone my-2`}>
                                <div className={`phone-adress-icon`}>
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className={``}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className={`phone-number`}>
                                    {c.businessPhone}
                                </div>
                            </div>
                            <div className={`adress mb-2`}>
                                <div className={`phone-adress-icon`}>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className={``}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className={`adress-info`}>
                                    {c.businessAddress}
                                </div>
                            </div>
                            <div className={`get-details-btn me-2`}>
                                <CardDetails card={c} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return drawCards;
    };

    return <div className={`cards-area-grid`}>{getColumnsForRow()}</div>;
}
