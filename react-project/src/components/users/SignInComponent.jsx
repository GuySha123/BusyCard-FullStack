import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { signinUser } from '../../data/userStorage';
import SignedInMsg from '../messages/SignedInMsg';

export default function SignInComponent() {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setLocalStorageToken, setSessionStorageToken } =
        useContext(UserTokenContext);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        navigate('/');
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        setTimeout(handleCloseConfirm, 3000);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError(null);
            const token = await signinUser(email, password, rememberMe);

            if (token) {
                if (rememberMe) {
                    setLocalStorageToken(token);
                } else {
                    setSessionStorageToken(token);
                }
                console.log('Logged In');
                handleShowConfirm();
            }
        } catch (error) {
            console.error(error);
            setError('Email/Password incorrect');
            return;
        }
    }

    return (
        <>
            <div className={`sign-in-container body-${theme} d-grid h-100`}>
                <Form
                    onSubmit={handleSubmit}
                    className='sign-in-form text-center w-100'
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        className='fa-5x'
                    ></FontAwesomeIcon>
                    <h1 className='fs-3 fw-normal mb-3'>Please sign in</h1>
                    <Form.Group controlId='sign-in-email-address text-input'>
                        <Form.Control
                            htmlFor='email'
                            type='email'
                            size='lg'
                            placeholder='Email address'
                            value={email}
                            className={`mb-3`}
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
                    <div className='d-grid mb-2'>
                        <button
                            type='submit'
                            className={`buttons-${theme} sign-in-register-btn`}
                            size='lg'
                        >
                            Sign in
                        </button>
                    </div>

                    <Link
                        to='/register'
                        className={`go-to-register link-${theme} `}
                    >
                        Need an Account?
                    </Link>
                </Form>
            </div>

            <SignedInMsg
                showConfirm={showConfirm}
                handleCloseConfirm={handleCloseConfirm}
            />
        </>
    );
}
