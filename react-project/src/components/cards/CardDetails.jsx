import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import '../../assets/styles/cards/CardDetails.css';

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
            <button
                className={`buttons-${theme} button-control`}
                onClick={handleShow}
            >
                More details
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                className={`modal-content-details`}
                centered
            >
                <Modal.Body className={`components-${theme} details-container`}>
                    <Modal.Title className={`card-details-title`}>
                        {businessName}
                    </Modal.Title>
                    <CloseButton
                        className={`form-close-x`}
                        aria-label='Hide'
                        onClick={handleClose}
                    />

                    <div
                        className={`card-image image-details-container business-cards-image-${theme}`}
                        style={{
                            backgroundImage: `url(${
                                businessImage === 'businessDefaultCardImage'
                                    ? businessDefaultCardImage
                                    : businessImage
                            })`,
                        }}
                    ></div>

                    <div className='card-detail'>
                        <div className='card-editor'>
                            <small>Card editor: {cardEditor}</small>
                        </div>
                        <div className={`last-update`}>
                            <small>Last updated: {businessCreateDate}</small>
                        </div>
                    </div>

                    <div className={`description-details`}>
                        Description: {businessDescription}
                    </div>

                    <div className={`phone-details `}>
                        <div className={`phone-address-icon`}>
                            <FontAwesomeIcon
                                icon={faPhone}
                                className={``}
                            ></FontAwesomeIcon>
                        </div>
                        <div className={`phone-number ms-1`}>
                            {businessPhone}
                        </div>
                    </div>
                    <div className={`address-details mb-2`}>
                        <div className={`phone-address-icon`}>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className={``}
                            ></FontAwesomeIcon>
                        </div>
                        <div className={`address-info ms-1`}>
                            {businessAddress}
                        </div>
                    </div>
                    <div className={`close-details`}>
                        <button
                            type='reset'
                            onClick={handleClose}
                            className={`buttons-${theme} button-control `}
                        >
                            Close
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
