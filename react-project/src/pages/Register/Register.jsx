import '../../assets/styles/Register.css';
import { Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function Regester() {
    return (
        <Container className='regester-choice-container d-grid h-100 '>
            <div className='regester-choice-div row text-center '>
                <h1 className='fs-3 fw-normal mb-3 '>Register</h1>
                <h2 className='fs-4 fw-normal mb-3'>
                    Please choose your preference
                </h2>

                <Nav>
                    <Nav.Link
                        href='/user'
                        className='register-choice user col m-3'
                    >
                        <h3>
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{' '}
                            <br />
                            User Account
                        </h3>
                    </Nav.Link>
                    <Nav.Link
                        href='/business'
                        className='register-choice business col m-3'
                    >
                        <h3>
                            <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>{' '}
                            <br />
                            Business Account
                        </h3>
                    </Nav.Link>
                </Nav>
            </div>
        </Container>
    );
}
