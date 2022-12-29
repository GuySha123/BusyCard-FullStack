import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className='bg-dark w-100 bottom-0 p-5 mb-0'>
            <div className='text-light text-center'>
                <a href='https://www.facebook.com/guysh1234/'>
                    <FontAwesomeIcon icon={faFacebook} size='2xl' />
                </a>
                <a href='https://www.linkedin.com/in/guy-shalev-93448b228/'>
                    <FontAwesomeIcon icon={faLinkedin} size='2xl' />
                </a>
                <a href='https://github.com/GuySha123'>
                    <FontAwesomeIcon icon={faGithub} size='2xl' />
                </a>
                <a href='mailto:guysh1234@gmail.com'>
                    <FontAwesomeIcon icon={faEnvelope} size='2xl' />
                </a>
            </div>
            <div className='text-light text-center'>
                React Project made by: Guy Shalev
            </div>
        </footer>
    );
}
