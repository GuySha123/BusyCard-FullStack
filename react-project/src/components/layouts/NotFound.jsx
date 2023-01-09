import React, { useContext } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/page-not-found/PageNotFound.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function NotFound() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`not-found-container body-${theme} d-grid h-100`}>
            <div className={`not-found-content-container components-${theme}`}>
                <div className={`not-found-content `}>
                    <h1>404</h1>
                    <p>The Page you are looking for was not found</p>
                    <Button className={`btn-dark`}>
                        <Nav.Link as={Link} to='/' eventkey='home'>
                            Let's go home
                        </Nav.Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
