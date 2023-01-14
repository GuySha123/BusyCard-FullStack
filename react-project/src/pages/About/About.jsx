import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ThemeContext } from '../../context/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className={`page-container body-${theme} h-100`}>
                <div className={`page-content-container my-4`}>
                    <div
                        className={`page-title-area mb-5 components-${theme} `}
                    >
                        <div className={`title-grid-holder ms-3`}>
                            <div className={'page-title p-0'}>
                                <h1 className={'m-0'}>About Us</h1>
                            </div>
                        </div>
                    </div>
                    <div className={`p-4 components-${theme} `}>
                        <h3>Welcome to Busycard!</h3>
                        <p>
                            This website is my little project to truly
                            understand how to code in React.js. <br />
                            On this website you'll be able to decide if you want
                            to register as a regular user or business user.{' '}
                            <br /> By choosing regular account you will be able
                            to watch others business cards. <br /> By choosing
                            business account you will be able to watch, create
                            and edit your own business cards.
                        </p>

                        <h4>FAQ</h4>
                        <Accordion className={`p-3`}>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                    Which account should I choose?
                                </Accordion.Header>
                                <Accordion.Body>
                                    The best way to have a full experience on
                                    this website is by creating a business
                                    account. This website is not industrial
                                    website so you should feel free to create a
                                    business account without feeling any guilt.
                                    <br />
                                    <br />
                                    Hope you will enjoy this site!
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>
                                    What coding languages did you use?
                                </Accordion.Header>
                                <Accordion.Body>
                                    This website is fully developt with HTML,
                                    CSS and JavaScript
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header>
                                    Which packages did you use?
                                </Accordion.Header>
                                <Accordion.Body>
                                    I used many packages to build this website.
                                    <br />
                                    But mainly I built this website with Vite
                                    with React.js, Bootstrap and Font Awesome
                                    for the frontend.
                                    <br />
                                    For the backend I used mainly Express.js,
                                    Mongoose, Bcrypt.js and jsonwebtoken
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='3'>
                                <Accordion.Header>
                                    Do I need to put my real email address?
                                </Accordion.Header>
                                <Accordion.Body>
                                    No, you can feel free to put whatever email
                                    address you can think of just make sure it
                                    has name@somthing.something
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
}
