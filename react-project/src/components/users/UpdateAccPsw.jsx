import React from 'react';
import { CloseButton, Form, InputGroup, Modal } from 'react-bootstrap';
import { signinUser, updateUserPassword } from '../../data/userStorage';

export default function UpdateAccPsw({
    user,
    token,
    showPws,
    handleClosePws,
    theme,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    matchPassword,
    setMatchPassword,
    errors,
    setErrors,
    handleShowConfirm,
}) {
    function checkPassword() {
        if (newPassword.length < 6) {
            return false;
        }
        return true;
    }

    function checkPasswordMatch() {
        if (newPassword === matchPassword && matchPassword.length > 0) {
            return true;
        }
        return false;
    }

    async function handleSubmitPass(event) {
        event.preventDefault();

        try {
            const id = user?._id;
            const email = user?.email;
            const userVerified = await signinUser(email, password);

            if (userVerified) {
                const newPasswordError = [];
                if (!checkPassword()) {
                    newPasswordError.push(
                        'Password must be at least 6 charecters'
                    );
                }

                const passwordMatchError = [];
                if (!checkPasswordMatch()) {
                    passwordMatchError.push('Password does not match');
                }

                const passwordError = [];
                if (!checkPasswordMatch() || !checkPassword()) {
                    passwordError.push('Incorrect password');
                }

                const newErrors = {};
                if (passwordError.length > 0) {
                    newErrors.password = passwordError;
                }
                if (newPasswordError.length > 0) {
                    newErrors.newPassword = newPasswordError;
                }
                if (passwordMatchError.length > 0) {
                    newErrors.matchPassword = passwordMatchError;
                }

                if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                    console.log(newErrors);
                    throw new Error();
                }
                await updateUserPassword(newPassword, token, id);
                handleShowConfirm();
            }
        } catch (error) {
            if (error.status === 400) {
                const passwordError = [];
                passwordError.push('Incorrect password');

                const newPasswordError = [];
                if (!checkPassword()) {
                    newPasswordError.push(
                        'Password must be at least 6 charecters'
                    );
                }

                const passwordMatchError = [];
                if (!checkPasswordMatch()) {
                    passwordMatchError.push('Password does not match');
                }
                const newErrors = {};
                if (passwordError.length > 0) {
                    newErrors.password = passwordError;
                }
                if (newPasswordError.length > 0) {
                    newErrors.newPassword = newPasswordError;
                }
                if (passwordMatchError.length > 0) {
                    newErrors.matchPassword = passwordMatchError;
                }

                setErrors(newErrors);
                return;
            } else {
                console.log(`Error occured: ${error}`);
                return;
            }
        }
    }

    return (
        <>
            <Modal
                show={showPws}
                onHide={handleClosePws}
                backdrop='static'
                keyboard={false}
                centered
            >
                <Modal.Body
                    className={`components-${theme} update-acc-container`}
                >
                    <Modal.Title className={`form-title mb-2`}>
                        Update password
                    </Modal.Title>
                    <CloseButton
                        className={`form-close-x`}
                        aria-label='Hide'
                        onClick={handleClosePws}
                    />

                    <Form
                        className={`update-acc-inputs-group`}
                        onSubmit={handleSubmitPass}
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

                            {errors.password &&
                                errors.password.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group className={`update-acc-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='password'
                                    name='newPassword'
                                    size='lg'
                                    placeholder='New Password'
                                    autoComplete='new-password'
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </InputGroup>

                            {errors.newPassword &&
                                errors.newPassword.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group className={`update-acc-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='password'
                                    name='matchPassword'
                                    size='lg'
                                    placeholder='Confirm Password'
                                    autoComplete='new-password'
                                    value={matchPassword}
                                    onChange={(e) =>
                                        setMatchPassword(e.target.value)
                                    }
                                />
                            </InputGroup>

                            {errors.matchPassword &&
                                errors.matchPassword.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>
                        <div className={`update-acc-btn`}>
                            <button
                                type='reset'
                                onClick={handleClosePws}
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
        </>
    );
}
