import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import '../../assets/styles/cards/CreateCard.css';
import { ThemeContext } from '../../context/ThemeContext';

export default function CardDetails({ card }) {
    const { theme } = useContext(ThemeContext);
    const [show, setShow] = useState(false);
    const businessName = card.businessName;
    const businessDescription = card.businessDescription;
    const businessAddress = card.businessAddress;
    const businessPhone = card.businessPhone;
    const businessImage = card.businessImage;
    const businessCreateDate = card.businessCreateDate;
    const cardEditor = card.cardEditor;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <Button
                variant='outline-light'
                className={`buttons-${theme} mb-2`}
                onClick={handleShow}
            >
                More details
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{businessName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {businessImage === 'businessDefaultCardImage' ? (
                        <img
                            className='business-image-watched-card'
                            src={businessDefaultCardImage}
                        ></img>
                    ) : (
                        <img
                            className='business-image-watched-card'
                            src={businessImage}
                            alt='Image not found'
                        />
                    )}
                    <div className='business-content'>
                        <p>Last updated: {businessCreateDate}</p>
                        <p>Card editor: {cardEditor}</p>
                        <hr></hr>
                        <p className=''>Description: {businessDescription}</p>
                        <p>Phone: {businessPhone}</p>
                        <p>Address: {businessAddress}</p>
                    </div>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}
