import {
    faBriefcase,
    faImage,
    faLocationDot,
    faMessage,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import urlExist from 'url-exist';
import '../../assets/styles/cards/CreateCard.css';
import { ThemeContext } from '../../context/ThemeContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { updateCard } from '../../data/cardStorage';
import UpdatedCardMsg from '../messages/UpdatedCardMsg';

export default function UpdateCard({ card, setOpen }) {
    const { theme } = useContext(ThemeContext);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [imageInput, setImageInput] = useState('');
    const { token } = useContext(UserTokenContext);
    const [id, setId] = useState(card._id);
    const [formData, setFormData] = useState({
        businessName: card.businessName,
        businessDescription: card.businessDescription,
        businessAddress: card.businessAddress,
        businessPhone: card.businessPhone,
        businessImage: card.businessImage,
        businessCreateDate: `${new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })}`,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setOpen(false);
    };
    const handleCloseConfirm = () => {
        setShowConfirm(false);
        setOpen(false);
        navigate('/businesscards');
    };
    const handleShowConfirm = () => {
        setShowConfirm(true);
        handleClose();
        setTimeout(handleCloseConfirm, 3000);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function checkBusinessName() {
        if (
            formData.businessName.length < 5 ||
            formData.businessName.length > 255
        ) {
            return false;
        }
        return true;
    }
    function checkBusinessDescription() {
        if (
            formData.businessDescription.length < 20 ||
            formData.businessDescription.length > 255
        ) {
            return false;
        }
        return true;
    }
    function checkBusinessAddress() {
        if (
            formData.businessAddress.length < 5 ||
            formData.businessAddress.length > 255
        ) {
            return false;
        }
        return true;
    }
    function checkBusinessPhone() {
        if (
            formData.businessPhone.length < 9 ||
            formData.businessPhone.length > 12 ||
            !/^\d+$/.test(formData.businessPhone)
        ) {
            return false;
        }
        return true;
    }
    function checkBusinessImage() {
        if (
            (imageInput.length > 0 && imageInput.length < 20) ||
            imageInput.length > 255
        ) {
            return false;
        }
        return true;
    }

    async function checkImageUrlExists() {
        const check = await urlExist(imageInput);
        return check;
    }

    function handleSubmit(event) {
        event.preventDefault();

        try {
            const {
                businessName: businessName,
                businessDescription: businessDescription,
                businessAddress: businessAddress,
                businessPhone: businessPhone,
                businessImage: businessImage,
                businessCreateDate: businessCreateDate,
            } = formData;

            const businessNameError = [];
            const businessDescriptionError = [];
            const businessAddressError = [];
            const businessPhoneError = [];
            const businessImageError = [];
            const newErrors = {};

            console.log(formData);

            updateCard(
                {
                    businessName,
                    businessDescription,
                    businessAddress,
                    businessPhone,
                    businessImage,
                    businessCreateDate,
                },
                token,
                id
            );

            if (imageInput.length === 0) {
                setFormData({
                    ...formData,
                    businessImage: 'businessDefaultCardImage',
                });
            } else if (imageInput.length > 20 && imageInput.length < 255) {
                checkImageUrlExists(imageInput).then((result) => {
                    if (result) {
                        console.log('Image URL exists');
                        setFormData({ ...formData, businessImage: imageInput });
                    } else {
                        console.log('Image URL does not exist');
                        setFormData({
                            ...formData,
                            businessImage: 'businessDefaultCardImage',
                        });
                        businessImageError.push('Image URL does not exist');
                        if (businessImageError.length > 0) {
                            newErrors.businessImage = businessImageError;
                        }
                    }
                });
            }

            if (!checkBusinessName()) {
                businessNameError.push(
                    'Business name must be at least 5 characters'
                );
            }
            if (!checkBusinessDescription()) {
                businessDescriptionError.push(
                    'Business description must between 20-255 characters'
                );
            }
            if (!checkBusinessAddress()) {
                businessAddressError.push(
                    'Business name must be at least 5 characters'
                );
            }
            if (!checkBusinessPhone()) {
                businessPhoneError.push('Invalid Phone number');
            }
            if (!checkBusinessImage()) {
                businessImageError.push(
                    'Business Image URL must be empty or at least 20 characters'
                );
            }

            if (businessNameError.length > 0) {
                newErrors.businessName = businessNameError;
            }
            if (businessDescriptionError.length > 0) {
                newErrors.businessDescription = businessDescriptionError;
            }
            if (businessAddressError.length > 0) {
                newErrors.businessAddress = businessAddressError;
            }
            if (businessPhoneError.length > 0) {
                newErrors.businessPhone = businessPhoneError;
            }
            if (businessImageError.length > 0) {
                newErrors.businessImage = businessImageError;
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                console.log(newErrors);
                throw new Error();
            }

            handleShowConfirm();
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <>
            <div
                className={`dropdown-item-custom dropdown-item-custom-${theme}`}
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            >
                Update card
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Body className={`components-${theme} form-container`}>
                    <Modal.Title className={`form-title mb-2`}>
                        Update A Card
                    </Modal.Title>
                    <CloseButton
                        className={`form-close-x`}
                        aria-label='Hide'
                        onClick={handleClose}
                    />
                    <Form
                        className={`form-inputs-group`}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className={`form-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faBriefcase}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessName'
                                    size='lg'
                                    placeholder={card.businessName}
                                    value={formData.businessName}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            {errors.businessName &&
                                errors.businessName.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group className={`form-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessAddress'
                                    size='lg'
                                    placeholder={card.businessAddress}
                                    value={formData.businessAddress}
                                    onChange={handleChange}
                                />
                            </InputGroup>

                            {errors.businessAddress &&
                                errors.businessAddress.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group className={`form-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessPhone'
                                    size='lg'
                                    placeholder={card.businessPhone}
                                    value={formData.businessPhone}
                                    onChange={handleChange}
                                />
                            </InputGroup>

                            {errors.businessPhone &&
                                errors.businessPhone.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>

                        <Form.Group className={`form-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faMessage}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    type='text'
                                    name='businessDescription'
                                    size='lg'
                                    placeholder={
                                        card.businessDescription +
                                        ' (min 20 characters)'
                                    }
                                    className={`business-description`}
                                    value={formData.businessDescription}
                                    onChange={handleChange}
                                />
                            </InputGroup>

                            {errors.businessDescription &&
                                errors.businessDescription.map(
                                    (error, index) => (
                                        <div
                                            className='error text-danger'
                                            key={index}
                                        >
                                            {error}
                                        </div>
                                    )
                                )}
                        </Form.Group>

                        <Form.Group className={`form-inputs mb-3`}>
                            <InputGroup hasValidation>
                                <InputGroup.Text>
                                    <FontAwesomeIcon
                                        icon={faImage}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessImage'
                                    size='lg'
                                    placeholder={
                                        card.businessImage ===
                                        'businessDefaultCardImage'
                                            ? 'Default Card Image'
                                            : card.businessImage
                                    }
                                    value={imageInput}
                                    onChange={(e) =>
                                        setImageInput(e.target.value)
                                    }
                                />
                            </InputGroup>

                            {errors.businessImage &&
                                errors.businessImage.map((error, index) => (
                                    <div
                                        className='error text-danger'
                                        key={index}
                                    >
                                        {error}
                                    </div>
                                ))}
                        </Form.Group>
                        <div className={`form-btn`}>
                            <button
                                type='reset'
                                onClick={handleClose}
                                className={`buttons-${theme} button-control me-3`}
                            >
                                Close
                            </button>
                            <button
                                type='submit'
                                className={`buttons-${theme} button-control`}
                            >
                                Update Card
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <UpdatedCardMsg
                showConfirm={showConfirm}
                handleCloseConfirm={handleCloseConfirm}
            />
        </>
    );
}
