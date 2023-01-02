import React, { useState } from 'react';
import '../../assets/styles/RegisterUser.css';
import { registerUser } from '../../data/userStorage';
//Bootstrap
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
//FontAwesome
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/*  */

export default function RegisterUser() {
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

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    function checkEmail() {
        if (formData.email.length < 6 || !formData.email.includes('@')) {
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

            console.log(formData);

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

            return console.log('works!');
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <Container className='register-user-container d-grid h-100'>
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

                <h1 className='fs-3 fw-normal mb-3'>User</h1>

                <Form.Group className='mb-3'>
                    <Form.Control
                        type='email'
                        name='email'
                        size='lg'
                        placeholder='Email address'
                        className='position-relative'
                        /*  */
                        value={formData.email}
                        onChange={handleChange}
                        /*  */
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
                        className='position-relative'
                        /*  */
                        value={formData.password}
                        onChange={handleChange}
                        /*  */
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
                        className='position-relative'
                        /*  */
                        value={matchPassword}
                        onChange={(e) => setMatchPassword(e.target.value)}
                        /*  */
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
                            autoComplete='given-name'
                            /*  */
                            value={formData.firstName}
                            onChange={handleChange}
                            /*  */
                        />

                        {errors.firstName &&
                            errors.firstName.map((error, index) => (
                                <div className='error text-danger' key={index}>
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
                            autoComplete='family-name'
                            /*  */
                            value={formData.lastName}
                            onChange={handleChange}
                            /*  */
                        />
                        {errors.lastName &&
                            errors.lastName.map((error, index) => (
                                <div className='error text-danger' key={index}>
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
                    <Button type='submit' size='lg'>
                        Sign-Up
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
