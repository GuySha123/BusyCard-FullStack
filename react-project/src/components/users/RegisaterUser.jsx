import React, { useContext, useState } from 'react';
import '../../assets/styles/RegisterUser.css';
import { registerUser } from '../../data/userStorage';
//Bootstrap
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
//FontAwesome
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import RegisteredMsg from '../messages/RegisteredMsg';
/*  */

export default function RegisterUser() {
    const { theme } = useContext(ThemeContext);
    const [errors, setErrors] = useState({});
    const [matchPassword, setMatchPassword] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isBusinessAccount: false,
        isAdminAccount: false,
    });
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        navigate('/signin');
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        setTimeout(handleCloseConfirm, 3000);
    };

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    function checkEmail() {
        if (
            formData.email.length < 6 ||
            !formData.email.includes('@') ||
            !formData.email.includes('.')
        ) {
            return false;
        }
        return true;
    }
    function checkPassword() {
        if (formData.password.length < 6) {
            return false;
        }
        return true;
    }
    function checkFirstName() {
        if (
            formData.firstName.length < 2 ||
            formData.firstName.match(/\d/) !== null
        ) {
            return false;
        }
        return true;
    }
    function checkLastName() {
        if (
            formData.lastName.length < 2 ||
            formData.lastName.match(/\d/) !== null
        ) {
            return false;
        }
        return true;
    }

    function checkPasswordMatch() {
        if (formData.password === matchPassword && matchPassword.length > 0) {
            return true;
        }
        return false;
    }

    function handleSubmit(event) {
        event.preventDefault();

        try {
            const {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                isBusinessAccount: isBusinessAccount,
                isAdminAccount: isAdminAccount,
            } = formData;

            registerUser({
                email,
                password,
                firstName,
                lastName,
                isBusinessAccount,
                isAdminAccount,
            });

            const emailError = [];
            if (!checkEmail()) {
                emailError.push('Email is invalid');
            }

            const passwordError = [];
            if (!checkPassword()) {
                passwordError.push('Password must be at least 6 charecters');
            }

            const passwordMatchError = [];
            if (!checkPasswordMatch()) {
                passwordMatchError.push('Password does not match');
            }

            const firstNameError = [];
            if (!checkFirstName()) {
                firstNameError.push('Please enter a valid name');
            }

            const lastNameError = [];
            if (!checkLastName()) {
                lastNameError.push('Please enter a valid name');
            }

            const newErrors = {};
            if (emailError.length > 0) {
                newErrors.email = emailError;
            }
            if (passwordError.length > 0) {
                newErrors.password = passwordError;
            }
            if (passwordMatchError.length > 0) {
                newErrors.matchPassword = passwordMatchError;
            }
            if (firstNameError.length > 0) {
                newErrors.firstName = firstNameError;
            }
            if (lastNameError.length > 0) {
                newErrors.lastName = lastNameError;
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                console.log(newErrors);
                throw new Error();
            }

            handleShowConfirm();
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <>
            <div
                className={`register-user-container body-${theme} d-grid h-100`}
            >
                <Form
                    className='register-user-form text-center w-100'
                    onSubmit={handleSubmit}
                >
                    {!formData.isBusinessAccount ? (
                        <FontAwesomeIcon
                            icon={faUser}
                            className='fa-5x'
                        ></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon
                            icon={faUserTie}
                            className='fa-5x'
                        ></FontAwesomeIcon>
                    )}

                    <h1 className='fs-3 fw-normal mb-3'>Create a user</h1>

                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='email'
                            name='email'
                            size='lg'
                            placeholder='Email address'
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email &&
                            errors.email.map((error, index) => (
                                <div className='error text-danger' key={index}>
                                    {error}
                                </div>
                            ))}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='password'
                            name='password'
                            size='lg'
                            placeholder='Password'
                            autoComplete='new-password'
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {errors.password &&
                            errors.password.map((error, index) => (
                                <div className='error text-danger' key={index}>
                                    {error}
                                </div>
                            ))}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='password'
                            name='matchPassword'
                            size='lg'
                            placeholder='Confirm Password'
                            autoComplete='new-password'
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                        />

                        {errors.matchPassword &&
                            errors.matchPassword.map((error, index) => (
                                <div className='error text-danger' key={index}>
                                    {error}
                                </div>
                            ))}
                    </Form.Group>

                    <Row className='mb-3'>
                        <Form.Group className='mb-3' as={Col} md='6'>
                            <Form.Control
                                type='text'
                                name='firstName'
                                size='lg'
                                placeholder='First name'
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            {errors.firstName &&
                                errors.firstName.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group as={Col} md='6'>
                            <Form.Control
                                type='text'
                                name='lastName'
                                size='lg'
                                placeholder='Last name'
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName &&
                                errors.lastName.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>
                    </Row>

                    <Form.Group className='d-flex justify-content-center mb-4'>
                        <Form.Check
                            label='Business Account'
                            type='checkbox'
                            name='isBusinessAccount'
                            value={formData.isBusinessAccount}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className='d-grid'>
                        <button
                            type='submit'
                            className={`buttons-${theme} sign-in-register-btn`}
                            size='lg'
                        >
                            Sign-Up
                        </button>
                    </div>
                </Form>
            </div>

            <RegisteredMsg
                showConfirm={showConfirm}
                handleCloseConfirm={handleCloseConfirm}
                fistName={formData.firstName}
                lastName={formData.lastName}
            />
        </>
    );
}
