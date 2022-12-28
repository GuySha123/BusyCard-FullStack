import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../../assets/styles/TopNavbar.css';
import { LoginContext } from '../../context/LoginContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { getUserByToken } from '../../data/storage';

// check how even when remember me is false i can still get the token info
// make a lazy function to let it reload first

export default function TopNavbar() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const { token, setToken } = useContext(UserTokenContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            getUserByToken(token).then((user) => {
                setUser(user);
                console.log(user);
            });
            setLoggedIn(true);
        }
    }, [token]);
    console.log(user);

    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            bg='dark'
            variant='dark'
            className='p-2 sticky-top'
        >
            <Navbar.Brand as={Link} to='/' eventkey='home'>
                React Project
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />

            <Navbar.Collapse id='responsive-navbar-nav' className='ms-auto'>
                {loggedIn ? (
                    <>
                        <Nav className=''>
                            <Nav.Link as={Link} to='about' eventkey='about'>
                                About
                            </Nav.Link>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link as={Link} to='users' eventkey='users'>
                                Users List
                            </Nav.Link>
                        </Nav>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='cards' eventkey='cards'>
                                Business Cards
                            </Nav.Link>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link
                                as={Link}
                                to={'/'}
                                eventkey='signout'
                                onClick={() => {
                                    setToken(null);
                                    setLoggedIn(false);
                                }}
                            >
                                Sign out
                            </Nav.Link>
                        </Nav>
                        <Navbar.Text className='m-2'>
                            <Stack direction='horizontal' gap={3}>
                                {user ? (
                                    <>
                                        {user.firstName} {user.lastName}
                                        <a href='#login'>
                                            <FontAwesomeIcon
                                                icon={
                                                    user.isBusinessAccount
                                                        ? faUserTie
                                                        : faUser
                                                }
                                                className='fa-2x'
                                            ></FontAwesomeIcon>
                                        </a>
                                    </>
                                ) : null}
                            </Stack>
                        </Navbar.Text>
                    </>
                ) : (
                    <>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='about' eventkey='about'>
                                About
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to='signin' eventkey='signin'>
                                Sign In
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to='register'
                                eventkey='register'
                            >
                                Register
                            </Nav.Link>
                        </Nav>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
