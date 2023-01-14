import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteCard, getCards } from '../../data/cardStorage';
import CardsTemplate from './CardsTemplate';
import SearchCards from './SearchCards';

export default function ShowCards() {
    const [cards, setCards] = useState([]);
    const { token } = useContext(UserTokenContext);
    const [text, setText] = useState('');
    const [searchChoice, setSearchChoice] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        reRender();
    }, []);

    function onSearchChange(text, searchChoice, date) {
        setText(text);
        setSearchChoice(searchChoice);
        setDate(date);
    }

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

    const filteredCards = useMemo(() => {
        return cards.filter((c) => {
            let cardDate = new Date(c.businessCreateDate).toLocaleDateString(
                'en-US',
                {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }
            );
            const [yearSelected, monthSelected, daySelected] = date.split('-');
            const selectedDate = `${daySelected}/${monthSelected}/${yearSelected}`;
            const searchDatePass =
                date === 'dd/mm/yyyy' || cardDate === selectedDate || !date;

            const searchChoiceBy =
                searchChoice === 'Search by...' ||
                (c.businessName.toLowerCase().indexOf(text.toLowerCase()) >
                    -1 &&
                    searchChoice === 'Company name') ||
                (c.cardEditor.toLowerCase().indexOf(text.toLowerCase()) > -1 &&
                    searchChoice === 'Creator') ||
                (c.businessPhone.toLowerCase().indexOf(text.toLowerCase()) >
                    -1 &&
                    searchChoice === 'Phone') ||
                (c.businessAddress.toLowerCase().indexOf(text.toLowerCase()) >
                    -1 &&
                    searchChoice === 'address') ||
                !searchChoice;

            const searchPass =
                !text ||
                c.businessName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                c.cardEditor.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                c.businessPhone.indexOf(text) > -1 ||
                c.businessAddress.toLowerCase().indexOf(text.toLowerCase()) >
                    -1;
            return searchDatePass && searchPass && searchChoiceBy;
        });
    }, [cards, text, date, searchChoice]);

    return (
        <>
            <SearchCards onChange={onSearchChange} />
            <CardsTemplate cards={filteredCards} onDelete={onDeleteClick} />
        </>
    );
}
