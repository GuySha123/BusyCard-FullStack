import React, { useContext } from 'react';
import { useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import UpdateCard from './UpdateCard';

export default function CardSettingsDropdown({ card, onDelete }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <UpdateCard card={card} />
            <li
                className={`dropdown-item-custom dropdown-item-custom-${theme}`}
                onClick={() => onDelete(card._id)}
            >
                Delete card
            </li>
        </>
    );
}
