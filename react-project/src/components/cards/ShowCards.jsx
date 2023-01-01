import React, { useContext, useEffect, useState } from 'react';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteCard, getMyCardById } from '../../data/cardStorage';
import { getCards } from '../../data/cardStorage';
import CardsTemplate from './CardsTemplate';

export default function ShowCards() {
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
        <>
            <div className='cards' id='cards'>
                <CardsTemplate cards={cards} onDelete={onDeleteClick} />
            </div>
        </>
    );
}
