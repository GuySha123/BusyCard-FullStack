import {
    faTrash,
    faEllipsisVertical,
    faPhone,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import CardDetails from './CardDetails';
import UpdateCard from './UpdateCard';
import '../../assets/styles/cards/Card.css';
import CardSettings from './CardSettings';

export default function CardsTemplate({ cards, onDelete }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserInfoContext);

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
                <Col key={i}>
                    {/* Container */}
                    <div
                        className={`card-container business-cards-${theme}`}
                        key={c._id}
                    >
                        {/* Image */}
                        {c.businessImage === 'businessDefaultCardImage' ? (
                            <img
                                className={`card-image`}
                                src={businessDefaultCardImage}
                            />
                        ) : (
                            <img
                                className={`card-image business-cards-image-${theme}`}
                                variant='top'
                                src={c.businessImage}
                                alt='Image not found'
                            />
                        )}
                        {/* Title */}
                        <div className={`card-title-container`}>
                            <div className={`card-title px-3 pt-2`}>
                                <div className={`business-title`}>
                                    <h2>{c.businessName}</h2>
                                    <h3>{c.cardEditor}</h3>
                                </div>
                                {/* <div className={`card-settings`}> */}
                                {/* <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                        className={`card-settings-dot`}
                                    ></FontAwesomeIcon> */}
                                <CardSettings card={c} />
                                {/* </div> */}
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`card-content px-3`}>
                            <div className={`text-muted mb-3 `}>
                                <small>
                                    Last updated: {c.businessCreateDate}
                                </small>
                            </div>
                            <div className={`col-10 text-truncate mb-2`}>
                                {c.businessDescription}
                            </div>
                            <div className='phone-adress-btn-grid'>
                                <div className={`phone `}>
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
                                <div className={`adress`}>
                                    <div className={`phone-adress-icon`}>
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className={``}
                                        ></FontAwesomeIcon>
                                    </div>
                                    <div
                                        className={`adress-info text-truncate`}
                                    >
                                        {c.businessAddress}
                                    </div>
                                </div>

                                <div className={`get-details-btn `}>
                                    <CardDetails card={c} />
                                </div>
                            </div>
                        </div>
                        {/* To card settings */}
                        {/* <Row>
                                {user && user.isAdminAccount ? (
                                    <>
                                        <Col lg='4'>
                                            <button
                                                className={`buttons-${theme}`}
                                                onClick={() => onDelete(c._id)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                ></FontAwesomeIcon>
                                            </button>
                                            <UpdateCard card={c} />
                                        </Col>
                                    </>
                                ) : null}
                            </Row> */}
                    </div>
                </Col>
            );
        });
        return drawCards;
    };

    return (
        <Row xs={1} md={1} xxl={2} className='g-4'>
            {getColumnsForRow()}
        </Row>
    );
}
