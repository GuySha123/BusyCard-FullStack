import {
    faBriefcase,
    faImage,
    faLocationDot,
    faMessage,
    faPenToSquare,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router';
import urlExist from 'url-exist';
import '../../assets/styles/cards/CreateCard.css';
import { UserTokenContext } from '../../context/UserTokenContext';
import { updateCard } from '../../data/cardStorage';

export default function UpdateCard({ card }) {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [imageInput, setImageInput] = useState('');
    const { token } = useContext(UserTokenContext);
    const [id, setId] = useState(card._id);
    const [formData, setFormData] = useState({
        businessName: card.businessName,
        businessDescription: card.businessDescription,
        businessAddress: card.businessAdress,
        businessPhone: card.businessPhone,
        businessImage: card.businessImage,
        businessCreateDate: `${new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })}`,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
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
            console.log(formData.businessCreateDate);

            console.log(token);
            console.log(id);

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

            navigate('/cards');
            setShow(false);

            return console.log('works!');
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <>
            <button variant='primary' onClick={handleShow}>
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
                    <Modal.Title>Create A Card</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='basic-addon1'>
                                    <FontAwesomeIcon
                                        icon={faBriefcase}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessName'
                                    size='lg'
                                    placeholder={card.businessName}
                                    className='position-relative'
                                    aria-describedby='basic-addon1'
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

                        <Form.Group className='mb-3'>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='basic-addon1'>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessAddress'
                                    size='lg'
                                    placeholder={card.businessAdress}
                                    className='position-relative'
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

                        <Form.Group className='mb-3'>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='basic-addon1'>
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                    ></FontAwesomeIcon>
                                </InputGroup.Text>
                                <Form.Control
                                    type='text'
                                    name='businessPhone'
                                    size='lg'
                                    placeholder={card.businessPhone}
                                    className='position-relative'
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

                        <Form.Group className='mb-3'>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='basic-addon1'>
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
                                    className='position-relative business-description'
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

                        <Form.Group className='mb-3'>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='basic-addon1'>
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
                                    className='position-relative'
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
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant='primary' type='submit'>
                                Update Card
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
