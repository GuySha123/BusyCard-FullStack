import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../assets/styles/messages/DeleteMsg.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function UpdatedUserMsg({ showConfirm, handleCloseConfirm }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <Modal.Title className={`msg-title`}>
                        User has been Updated successfully
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </>
    );
}
