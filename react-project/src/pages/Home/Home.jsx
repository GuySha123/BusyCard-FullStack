import React, { useContext, useEffect, useState } from 'react';
import HomePageCards from '../../components/cards/HomePageCards';
import { ThemeContext } from '../../context/ThemeContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteCard, getCards } from '../../data/cardStorage';
import webLogoLight from '../../assets/images/logo/BusyCardLogo.png';
import webLogoDark from '../../assets/images/logo/BusyCardLogoLight.png';
import '../../assets/styles/pages/HomePage.css';

export default function Home() {
    const { theme } = useContext(ThemeContext);
    const [cards, setCards] = useState([]);
    const { token } = useContext(UserTokenContext);

    useEffect(() => {
        reRender();
    }, []);

    function onDeleteClick(id) {
        deleteCard(id, token)
            .then((res) => {
                reRender();
            })
            .catch((error) => console.error(error));
    }

    function reRender() {
        getCards()
            .then((res) => {
                console.log(res);
                setCards([...res]);
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <div className={`home-page page-container body-${theme} h-100`}>
            <div
                className={`page-content-container home-page-content-container my-4`}
            >
                <div
                    className={`page-title-area home-title mb-5 components-${theme} `}
                >
                    <div className={`title-grid-holder ms-3`}>
                        <div className={'page-title p-0'}>
                            <div
                                className={`website-logo`}
                                style={{
                                    backgroundImage: `url(${
                                        theme === 'light'
                                            ? webLogoLight
                                            : webLogoDark
                                    })`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <HomePageCards cards={cards} onDelete={onDeleteClick} />
            </div>
        </div>
    );
}
