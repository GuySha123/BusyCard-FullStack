import React, { useEffect, useState } from 'react';
import { getCards } from '../../data/storage';
import CardsTemplate from './CardsTemplate';

export default function ShowCards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        reRender();
    }, []);

    function reRender() {
        getCards()
            .then((res) => {
                console.log(res);
                setCards([...res]);
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <div>
            <h2>Cards</h2>
            <div className='cards' id='cards'>
                <CardsTemplate cards={cards} />
            </div>
        </div>
    );
}
