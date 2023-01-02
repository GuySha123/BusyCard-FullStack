import React, { useContext } from 'react';
import ShowCards from '../../components/cards/ShowCards';
import { ThemeContext } from '../../context/ThemeContext';

export default function Home() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`home-page body-${theme} h-100`}>
            <h1>Business Cards</h1>
            <ShowCards />
        </div>
    );
}
