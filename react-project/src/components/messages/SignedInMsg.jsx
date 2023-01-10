import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../assets/styles/messages/DeleteMsg.css';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';

export default function SignedInMsg({ showConfirm, handleCloseConfirm }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserInfoContext);

    return (
        <>
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <Modal.Title className={`msg-title`}>
                        {`Welcome ${user?.firstName} ${user?.lastName}!`}
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </>
    );
}
