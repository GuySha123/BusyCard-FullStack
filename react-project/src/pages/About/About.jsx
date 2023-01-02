import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className={`about-page body-${theme} h-100`}>
                <h1>This is About page</h1>
            </div>
        </>
    );
}
