import React from 'react';
import '../../assets/styles/page-not-found/PageNotFound.css';
import { Button, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Container className='not-found-container d-grid h-100'>
            <div className='not-found-content-container '>
                <div className='not-found-content'>
                    <h1>404</h1>
                    <p>The Page you are looking for was not found</p>
                    <Button className='btn-dark'>
                        <Nav.Link as={Link} to='/' eventkey='home'>
                            Let's go home
                        </Nav.Link>
                    </Button>
                </div>
            </div>
        </Container>
    );
}
