import {
    faEllipsisVertical,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';

import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import CardDetails from './CardDetails';
import CardSettingsDropdown from './CardSettingsDropdown';

export default function CardsTemplate({ cards, onDelete }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserInfoContext);
    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState(null);

    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };
    const sortedCards = cards.sort((a, b) => {
        const dateA = parseDateString(a.businessCreateDate);
        const dateB = parseDateString(b.businessCreateDate);
        return dateB - dateA;
    });

    if (!cards) <div>No cards</div>;

    const getColumnsForRow = () => {
        let drawCards = sortedCards.map((c, i) => {
            return (
                <div key={i} className={`cards-col`}>
                    {/* Container */}

                    <div
                        className={`card-container  business-cards-${theme}`}
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
                        <div className={`card-title-container`}>
                            <div className={`card-title ps-3 pe-1 pt-2`}>
                                <div
                                    className={`business-title col-10 text-truncate`}
                                >
                                    <h2>{c.businessName}</h2>
                                    <h3>{c.cardEditor}</h3>
                                </div>
                                {/*  */}
                                {(user && user.isAdminAccount) ||
                                user?._id === c.userId ? (
                                    <div className={`card-settings`}>
                                        <div
                                            className={`menu-trigger`}
                                            onClick={() => {
                                                setOpen(!open);
                                                setOpenId(i);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                                className={`card-settings-dot`}
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
                                                    onDelete={onDelete}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
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
