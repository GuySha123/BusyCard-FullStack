import React, { useContext, useState } from 'react';
import { CloseButton, Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import '../../assets/styles/messages/DeleteMsg.css';
import { LoginContext } from '../../context/LoginContext';
import { ThemeContext } from '../../context/ThemeContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteUser, signinUser } from '../../data/userStorage';

export default function DeleteMsgUserAcc({ user, setOpen }) {
    const { theme } = useContext(ThemeContext);
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const { token, setToken } = useContext(UserTokenContext);
    const [error, setError] = useState({});
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setError({});
    };
    const handleShow = () => {
        setShow(true);
        setOpen(false);
    };

    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => {
        setShowConfirm(false);
        setLoggedIn(false);
        onDeleteClick(user?._id);
        setToken(null);
        navigate('/');
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        handleClose();
        setTimeout(handleCloseConfirm, 3000);
    };

    function onDeleteClick(id) {
        if (token) {
            deleteUser(id)
                .then((res) => {
                    console.log('Account deleted successfully');
                })
                .catch((error) => alert(error.message));
        }
    }

    async function handleSubmitDel(event) {
        event.preventDefault();
        try {
            const email = user?.email;
            const userVerified = await signinUser(email, password);
            if (userVerified) {
                handleShowConfirm();
            }
        } catch (error) {
            if (error.status === 400) {
                const passwordError = [];
                passwordError.push('Incorrect password');

                const newError = {};
                if (passwordError.length > 0) {
                    newError.password = passwordError;
                }
                setError(newError);
                return;
            } else {
                console.log(`Error occured: ${error}`);
                return;
            }
        }
    }

    return (
        <>
            <div
                className={`dropdown-item-custom dropdown-item-custom-${theme}`}
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            >
                Delete account
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <div className={`msg-grid`}>
                        <Modal.Title className={`msg-title`}>
                            Delete this account?
                        </Modal.Title>
                        <CloseButton
                            className={`msg-close-x`}
                            aria-label='Hide'
                            onClick={handleClose}
                        />

                        <Form
                            className={`update-acc-inputs-group`}
                            onSubmit={handleSubmitDel}
                        >
                            <Form.Group className={`update-acc-inputs mb-3`}>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        size='lg'
                                        placeholder='Old Password'
                                        autoComplete='new-password'
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </InputGroup>

                                {error.password &&
                                    error.password.map((error, index) => (
                                        <div
                                            className='error text-danger'
                                            key={index}
                                        >
                                            {error}
                                        </div>
                                    ))}
                            </Form.Group>

                            <div className={`msg-options `}>
                                <button
                                    type='reset'
                                    className={`buttons-${theme} button-control-close `}
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                                <button
                                    type='submit'
                                    className={`buttons-${theme} button-control`}
                                    onClick={handleShowConfirm}
                                >
                                    Delete
                                </button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <Modal.Title className={`msg-title`}>
                        The account has been deleted
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </>
    );
}
