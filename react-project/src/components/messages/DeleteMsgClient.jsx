import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../../assets/styles/messages/DeleteMsg.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function DeleteMsgClient({ id, user, onDelete }) {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { theme } = useContext(ThemeContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseConfirm = () => {
        onDelete(user?._id);
        setShowConfirm(false);
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        handleClose();
        setTimeout(handleCloseConfirm, 3000);
    };

    return (
        <>
            <button
                className={`buttons-${theme} button-control-small`}
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className={`msg-container components-${theme} `}>
                    <div className={`msg-grid`}>
                        <Modal.Title className={`msg-title`}>
                            Delete this user?
                        </Modal.Title>
                        <CloseButton
                            className={`msg-close-x`}
                            aria-label='Hide'
                            onClick={handleClose}
                        />

                        <div className={`msg-user-info`}>
                            <div className='user-name'>Id: {id + 1}</div>
                            <div className='user-name'>
                                Email: {user?.email}
                            </div>
                            <div className='user-name'>
                                Name: {user?.firstName} {user?.lastName}
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
                        User has been deleted successfully
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </>
    );
}
