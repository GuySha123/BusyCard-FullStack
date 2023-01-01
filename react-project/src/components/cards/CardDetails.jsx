import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import '../../assets/styles/cards/CreateCard.css';

export default function CardDetails({ card }) {
    const [show, setShow] = useState(false);
    const businessName = card.businessName;
    const businessDescription = card.businessDescription;
    const businessAddress = card.businessAdress;
    const businessPhone = card.businessPhone;
    const businessImage = card.businessImage;
    const businessCreateDate = card.businessCreateDate;

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <Button className='mb-2' onClick={handleShow}>
                More details
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName='modal-100w'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{businessName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {businessImage === 'businessDefaultCardImage' ? (
                        <div className='business-image w-60'>
                            <img src={businessDefaultCardImage}></img>
                        </div>
                    ) : (
                        <div className='business-image w-60'>
                            <img src={businessImage} alt='Image not found' />
                        </div>
                    )}
                    <div className='business-content'>
                        <p className=''>Description: {businessDescription}</p>
                        <p>Phone: {businessPhone}</p>
                        <p>Address: {businessAddress}</p>
                        <div className='card-footer'>
                            <small className='text-muted'>
                                Last updated: {businessCreateDate}
                            </small>
                        </div>
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
