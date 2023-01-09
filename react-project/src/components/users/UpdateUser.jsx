import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../context/ThemeContext';

export default function UpdateUser() {
    const [show, setShow] = useState(false);
    const { theme } = useContext(ThemeContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to
                    press escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary'>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
