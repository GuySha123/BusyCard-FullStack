import {
    faFacebook,
    faGithub,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Stack } from 'react-bootstrap';
import '../../assets/styles/navbar-footer/Footer.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function Footer() {
    const { theme } = useContext(ThemeContext);
    return (
        <footer className={`navbar-footer-${theme} w-100 bottom-0 p-4 mb-0`}>
            <div className={`text-center`}>
                <Stack
                    gap={2}
                    direction='horizontal'
                    className='contact-footer text-center mb-2'
                >
                    <div className=''>
                        <a href='https://www.facebook.com/guysh1234/'>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                size='2xl'
                                className={`link-${theme}`}
                            />
                        </a>
                    </div>
                    <div className=''>
                        <a href='https://www.linkedin.com/in/guy-shalev-93448b228/'>
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                size='2xl'
                                className={`link-${theme}`}
                            />
                        </a>
                    </div>
                    <div className=''>
                        <a href='https://github.com/GuySha123'>
                            <FontAwesomeIcon
                                icon={faGithub}
                                size='2xl'
                                className={`link-${theme}`}
                            />
                        </a>
                    </div>
                    <div className=''>
                        <a href='mailto:guysh1234@gmail.com'>
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                size='2xl'
                                className={`link-${theme}`}
                            />
                        </a>
                    </div>
                </Stack>
            </div>
            <div className={`text-${theme} text-center`}>
                React Project made by: Guy Shalev
            </div>
        </footer>
    );
}
