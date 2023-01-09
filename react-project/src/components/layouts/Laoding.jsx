import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import '../../assets/styles/pages/Laoding.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function Laoding() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`body-${theme} h-100`}>
            <div
                className={`laoding-container laoding-container-${theme} h-100`}
            >
                <Spinner
                    animation='border'
                    variant={theme === 'light' ? 'light' : 'dark'}
                    role='status'
                    className='loading-spinner'
                >
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
        </div>
    );
}
