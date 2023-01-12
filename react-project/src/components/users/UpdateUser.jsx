import {
    faPenToSquare,
    faUser,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { CloseButton, Form, InputGroup, Modal } from 'react-bootstrap';
import '../../assets/styles/user/UpdateAccount.css';
import { ThemeContext } from '../../context/ThemeContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { updateUser } from '../../data/userStorage';
import UpdatedUserMsg from '../messages/UpdatedUserMsg';

export default function UpdateUser({ users }) {
    const [show, setShow] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(UserTokenContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errors, setErrors] = useState({});
    const [id, setId] = useState(users?._id);
    const [formData, setFormData] = useState({
        email: users?.email,
        firstName: users?.firstName,
        lastName: users?.lastName,
        isBusinessAccount: users?.isBusinessAccount,
    });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => {
        setShowConfirm(false);
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

    function handleSubmit(event) {
        event.preventDefault();

        try {
            const {
                email: email,
                firstName: firstName,
                lastName: lastName,
                isBusinessAccount: isBusinessAccount,
            } = formData;

            updateUser(
                {
                    email,
                    firstName,
                    lastName,
                    isBusinessAccount,
                },
                token,
                id
            );

            const emailError = [];
            if (!checkEmail()) {
                emailError.push('Email is invalid');
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
            <button
                className={`buttons-${theme} button-control-small`}
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                centered
            >
                <Modal.Body
                    className={`components-${theme} update-acc-container`}
                >
                    <Modal.Title className={`form-title mb-2`}>
                        Update account
                    </Modal.Title>
                    <CloseButton
                        className={`form-close-x`}
                        aria-label='Hide'
                        onClick={handleClose}
                    />
                    {!formData.isBusinessAccount ? (
                        <div className={`update-profile-img`}>
                            <FontAwesomeIcon
                                icon={faUser}
                                className='fa-5x'
                            ></FontAwesomeIcon>
                        </div>
                    ) : (
                        <div className={`update-profile-img`}>
                            <FontAwesomeIcon
                                icon={faUserTie}
                                className='fa-5x'
                            ></FontAwesomeIcon>
                        </div>
                    )}

                    <Form
                        className={`update-acc-inputs-group`}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className={`update-acc-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    size='lg'
                                    placeholder='Email address'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            {errors.email &&
                                errors.email.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <div
                            className={`update-acc-inputs update-user-name mb-3`}
                        >
                            <Form.Group
                                className={`update-user-fist-name me-2`}
                            >
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type='text'
                                        name='firstName'
                                        size='lg'
                                        placeholder='First name'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </InputGroup>

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

                            <Form.Group className={`update-user-last-name`}>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type='text'
                                        name='lastName'
                                        size='lg'
                                        placeholder='Last name'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </InputGroup>

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
                        </div>

                        <Form.Group
                            className={`update-checkbox d-flex justify-content-center mb-4`}
                        >
                            <Form.Check
                                label='Business Account'
                                type='checkbox'
                                name='isBusinessAccount'
                                value={formData.isBusinessAccount}
                                defaultChecked={formData.isBusinessAccount}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className={`update-acc-btn`}>
                            <button
                                type='reset'
                                onClick={handleClose}
                                className={`buttons-${theme} button-control me-3`}
                            >
                                Close
                            </button>
                            <button
                                type='submit'
                                className={`buttons-${theme} button-control`}
                            >
                                Update
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <UpdatedUserMsg
                showConfirm={showConfirm}
                handleCloseConfirm={handleCloseConfirm}
            />
        </>
    );
}
