import React, { useContext, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../../assets/styles/messages/DeleteMsg.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function DeleteMsgCard({ id, card, setOpen, onDelete }) {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { theme } = useContext(ThemeContext);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setOpen(false);
    };

    const handleCloseConfirm = () => {
        onDelete(card?._id);
        setShowConfirm(false);
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        handleClose();
        setTimeout(handleCloseConfirm, 3000);
    };

    return (
        <>
            <li
                className={`dropdown-item-custom dropdown-item-custom-${theme}`}
                onClick={handleShow}
            >
                Delete card
            </li>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <div className={`msg-grid`}>
                        <Modal.Title className={`msg-title`}>
                            Delete this card?
                        </Modal.Title>
                        <CloseButton
                            className={`msg-close-x`}
                            aria-label='Hide'
                            onClick={handleClose}
                        />

                        <div className={`msg-user-info`}>
                            <div className='user-name'>Id: {id + 1}</div>
                            <div className='user-name'>
                                Business name: {card?.businessName}
                            </div>
                            <div className='user-name'>
                                Card editor: {card?.cardEditor}
                            </div>
                        </div>
                        <div className={`msg-options `}>
                            <button
                                className={`buttons-${theme} button-control-close `}
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button
                                className={`buttons-${theme} button-control`}
                                onClick={handleShowConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <Modal.Title className={`msg-title`}>
                        The card has been deleted successfully
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </>
    );
}
