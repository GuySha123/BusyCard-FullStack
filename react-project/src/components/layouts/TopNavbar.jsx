import {
    faMoon,
    faSun,
    faUser,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import BusyCardSmallLogo from '../../assets/images/logo/BusyCardSmallLogo.png';
import '../../assets/styles/navbar-footer/TopNavbar.css';
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';

export default function TopNavbar() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const { theme, changeTheme } = useContext(ThemeContext);
    const { setToken } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);

    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            className={`top-navbar navbar-footer-${theme} p-2 sticky-top`}
        >
            <Navbar.Brand
                className={`logo m-0`}
                as={Link}
                to='/'
                eventkey='home'
            >
                <img src={BusyCardSmallLogo} alt='BusyCardSmallLogo' />
            </Navbar.Brand>

            <Nav className='d-block d-lg-none mt-1'>
                <FontAwesomeIcon
                    icon={theme === 'light' ? faSun : faMoon}
                    className={
                        theme === 'light' ? `fa-2x sun-icon` : `fa-2x moon-icon`
                    }
                    style={{ cursor: 'pointer' }}
                    onClick={changeTheme}
                />
            </Nav>
            <Navbar.Toggle
                aria-controls='responsive-navbar-nav'
                className={` humburger-${theme}`}
            />

            <Navbar.Collapse id='responsive-navbar-nav' className={`ms-auto`}>
                {loggedIn ? (
                    <>
                        <Navbar.Text className='d-block d-lg-none'>
                            <Stack
                                className={`user-top-navbar-area-small `}
                                direction='horizontal'
                                gap={3}
                            >
                                {user ? (
                                    <>
                                        <div
                                            className={`profile-picture-small profile-image-${theme}`}
                                        >
                                            <Nav.Link
                                                as={Link}
                                                to={'/profile'}
                                                eventkey='profile'
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        user.isBusinessAccount
                                                            ? faUserTie
                                                            : faUser
                                                    }
                                                    className={`profile-image text-${theme} fa-4x`}
                                                ></FontAwesomeIcon>
                                            </Nav.Link>
                                        </div>
                                        <div
                                            className={`'user-greeting' text-small-${theme}`}
                                        >
                                            Hello, <br /> {user.firstName}{' '}
                                            {user.lastName}
                                        </div>
                                    </>
                                ) : null}
                            </Stack>
                        </Navbar.Text>
                        <Nav>
                            <Nav.Link
                                className={`link-${theme}`}
                                as={Link}
                                to='about'
                                eventkey='about'
                            >
                                About
                            </Nav.Link>
                        </Nav>
                        {user && user.isAdminAccount ? (
                            <Nav className=''>
                                <Nav.Link
                                    className={`link-${theme}`}
                                    as={Link}
                                    to='users'
                                    eventkey='users'
                                >
                                    Users List
                                </Nav.Link>
                            </Nav>
                        ) : null}
                        <Nav className='me-auto'>
                            <Nav.Link
                                className={`link-${theme}`}
                                as={Link}
                                to='businesscards'
                                eventkey='businesscards'
                            >
                                Business Cards
                            </Nav.Link>
                        </Nav>
                        <Nav className='d-none d-lg-block'>
                            <FontAwesomeIcon
                                icon={theme === 'light' ? faSun : faMoon}
                                className={
                                    theme === 'light'
                                        ? `fa-2x sun-icon me-2`
                                        : `fa-2x moon-icon me-2`
                                }
                                style={{ cursor: 'pointer' }}
                                onClick={changeTheme}
                            />
                        </Nav>
                        <Nav className=''>
                            <Nav.Link
                                className={`link-${theme}`}
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
                        <Navbar.Text className='d-none d-lg-block m-2'>
                            <Stack
                                className='user-top-navbar-area-large'
                                direction='horizontal'
                                gap={3}
                            >
                                {user ? (
                                    <>
                                        <div
                                            className={`'user-greeting' text-small-${theme}`}
                                        >
                                            Hello, <br /> {user.firstName}{' '}
                                            {user.lastName}
                                        </div>
                                        <div
                                            className={`profile-picture-large profile-image-${theme}`}
                                        >
                                            <Nav.Link
                                                as={Link}
                                                to={'/profile'}
                                                eventkey='profile'
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        user.isBusinessAccount
                                                            ? faUserTie
                                                            : faUser
                                                    }
                                                    className={`profile-image text-${theme} fa-2x`}
                                                ></FontAwesomeIcon>
                                            </Nav.Link>
                                        </div>
                                    </>
                                ) : null}
                            </Stack>
                        </Navbar.Text>
                    </>
                ) : (
                    <>
                        <Nav className='me-auto'>
                            <Nav.Link
                                className={`link-${theme}`}
                                as={Link}
                                to='about'
                                eventkey='about'
                            >
                                About
                            </Nav.Link>
                        </Nav>

                        <Nav className='d-none d-lg-block'>
                            <FontAwesomeIcon
                                icon={theme === 'light' ? faSun : faMoon}
                                className={
                                    theme === 'light'
                                        ? `fa-2x sun-icon me-2`
                                        : `fa-2x moon-icon me-2 text-${theme}`
                                }
                                style={{ cursor: 'pointer' }}
                                onClick={changeTheme}
                            />
                        </Nav>
                        <Nav>
                            <Nav.Link
                                className={`link-${theme}`}
                                as={Link}
                                to='signin'
                                eventkey='signin'
                            >
                                Sign In
                            </Nav.Link>
                            <Nav.Link
                                className={`link-${theme}`}
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
