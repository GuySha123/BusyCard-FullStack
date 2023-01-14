import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import '../../assets/styles/cards/HomePageCards.css';
import { ThemeContext } from '../../context/ThemeContext';
import CardDetails from './CardDetails';

export default function HomePageCards({ cards }) {
    const { theme } = useContext(ThemeContext);
    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    const parseDateString = (dateString) => {
        const [date, time] = dateString.split(', ');
        const [day, month, year] = date.split('/');
        const [hour, minute, second] = time.split(':');
        return new Date(year, month - 1, day, hour, minute, second);
    };
    const sortedCards = cards.sort((a, b) => {
        const dateA = parseDateString(a.businessCreateDate);
        const dateB = parseDateString(b.businessCreateDate);
        return dateB - dateA;
    });
    const firstFiveCards = sortedCards.slice(0, 3);

    if (cards.length == 0) {
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

    const getHomePageCards = () => {
        let drawCards = firstFiveCards.map((c, i) => {
            return (
                <label
                    key={i}
                    htmlFor={`item-${i + 1}`}
                    className={`home-card`}
                    id={`home-card-${i + 1}`}
                >
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
                        <div
                            className={`card-title-container card-title-container-${theme}`}
                        >
                            <div className={`card-title ps-3 pe-1 pt-2`}>
                                <div
                                    className={`business-title col-10 text-truncate`}
                                >
                                    <h2>{c.businessName}</h2>
                                    <h3>{c.cardEditor}</h3>
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
                                <div className={`phone-address-icon`}>
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className={``}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className={`phone-number`}>
                                    {c.businessPhone}
                                </div>
                            </div>
                            <div className={`address mb-2`}>
                                <div className={`phone-address-icon`}>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className={``}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className={`address-info`}>
                                    {c.businessAddress}
                                </div>
                            </div>
                            <div className={`get-details-btn me-2`}>
                                <CardDetails card={c} />
                            </div>
                        </div>
                    </div>
                </label>
            );
        });
        return drawCards;
    };

    return (
        <div className={`home-card-area`}>
            <input
                type='radio'
                name='slider'
                id={`item-1`}
                checked={isChecked1}
                onChange={() => setIsChecked1(!isChecked1)}
            />
            <input
                type='radio'
                name='slider'
                id={`item-2`}
                checked={isChecked2}
                onChange={() => setIsChecked2(!isChecked2)}
            />
            <input
                type='radio'
                name='slider'
                id={`item-3`}
                checked={isChecked3}
                onChange={() => setIsChecked3(!isChecked3)}
            />
            <div className='home-cards'>{getHomePageCards()}</div>
        </div>
    );
}
