import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/SignIn.css';
import { LoginContext } from '../../context/LoginContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { signinUser } from '../../data/userStorage';

export default function SignIn() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setLocalStorageToken, setSessionStorageToken } =
        useContext(UserTokenContext);

    async function handleSubmit(event) {
        event.preventDefault();

        // Send sign-in request to database, then retrieve token

        try {
            setError(null);
            const token = await signinUser(email, password, rememberMe);

            if (token) {
                if (rememberMe) {
                    setLocalStorageToken(token);
                } else {
                    setSessionStorageToken(token);
                }
                setLoggedIn(true);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setError('Email/Password incorrect');
            return;
        }
        // Save token to local storage if "remember me" is checked
    }

    return (
        <Container className='sign-in-container d-grid h-100'>
            <Form
                onSubmit={handleSubmit}
                className='sign-in-form text-center w-100'
            >
                <FontAwesomeIcon
                    icon={faUser}
                    className='fa-5x'
                ></FontAwesomeIcon>
                <h1 className='fs-3 fw-normal mb-3'>Please sign in</h1>
                <Form.Group controlId='sign-in-email-address'>
                    <Form.Control
                        htmlFor='email'
                        type='email'
                        size='lg'
                        placeholder='Email address'
                        value={email}
                        className='position-relative'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='sign-in-password' className='mb-3'>
                    <Form.Control
                        htmlFor='Password'
                        type='password'
                        size='lg'
                        placeholder='Password'
                        value={password}
                        className='position-relative'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId='remember-me'
                    className='d-flex justify-content-center mb-4'
                >
                    <Form.Check
                        label='Remember me'
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                </Form.Group>

                {error && <div className='error text-danger'>{error}</div>}
                <div className='d-grid'>
                    <Button type='submit' variant='primary' size='lg'>
                        Sign in
                    </Button>
                </div>

                <Link to='/register'>Need an Account?</Link>
            </Form>
        </Container>
    );
}
