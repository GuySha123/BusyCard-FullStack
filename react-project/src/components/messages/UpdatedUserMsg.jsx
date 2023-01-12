import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../assets/styles/messages/DeleteMsg.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function UpdatedUserMsg({
    showConfirm,
    handleCloseConfirm,
    showPws,
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    {!showPws ? (
                        <Modal.Title className={`msg-title`}>
                            The account has been updated
                        </Modal.Title>
                    ) : (
                        <Modal.Title className={`msg-title`}>
                            Password has been updated
                        </Modal.Title>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
