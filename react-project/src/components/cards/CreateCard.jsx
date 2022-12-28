import React, { useState } from 'react';
import urlExist from 'url-exist';
import '../../assets/styles/CreateCard.css';
import { CreateCardDb } from '../../data/storage';

//Bootstrap
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
/* import Col from 'react-bootstrap/Col';*/
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { UserTokenContext } from '../../context/UserTokenContext';

/* import Row from 'react-bootstrap/Row';
 */

export default function CreateCard() {
    const [errors, setErrors] = useState({});
    const [imageInput, setImageInput] = useState('');
    const { token } = useContext(UserTokenContext);
    const [formData, setFormData] = useState({
        businessName: '',
        businessDescription: '',
        businessAddress: '',
        businessPhone: '',
        businessImage: 'businessDefaultCardImage',
        businessCreateDate: `${new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })}`,
    });

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

            CreateCardDb(
                {
                    businessName,
                    businessDescription,
                    businessAddress,
                    businessPhone,
                    businessImage,
                    businessCreateDate,
                },
                token
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

            return console.log('works!');
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <Container className='register-user-container d-grid h-100'>
            <Form
                className='register-user-form text-center w-100'
                onSubmit={handleSubmit}
            >
                <h1 className='fs-3 fw-normal mb-3'>Create A Card</h1>

                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        name='businessName'
                        size='lg'
                        placeholder='Business Name'
                        className='position-relative'
                        value={formData.businessName}
                        onChange={handleChange}
                    />

                    {errors.businessName &&
                        errors.businessName.map((error, index) => (
                            <div className='error text-danger' key={index}>
                                {error}
                            </div>
                        ))}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        name='businessAddress'
                        size='lg'
                        placeholder='Business Address'
                        autoComplete='new-password'
                        className='position-relative'
                        value={formData.businessAddress}
                        onChange={handleChange}
                    />

                    {errors.businessAddress &&
                        errors.businessAddress.map((error, index) => (
                            <div className='error text-danger' key={index}>
                                {error}
                            </div>
                        ))}
                </Form.Group>

                {/* <Row className="mb-3">
                    <Form.Group as={Col} md="5" >
                    <Form.Control
                        type="text"
                        name="firstName"
                        size="lg"
                        placeholder="City"
                        autoComplete="given-name"
                    />

                    </Form.Group>
                        <Form.Group as={Col} md="7" >
                        <Form.Control
                            type="text"
                            name="lastName"
                            size="lg"
                            placeholder="Address"
                            autoComplete="family-name"
                        />

                    </Form.Group>
                </Row> */}

                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        name='businessPhone'
                        size='lg'
                        placeholder='Business Phone'
                        className='position-relative'
                        value={formData.businessPhone}
                        onChange={handleChange}
                    />

                    {errors.businessPhone &&
                        errors.businessPhone.map((error, index) => (
                            <div className='error text-danger' key={index}>
                                {error}
                            </div>
                        ))}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        type='text'
                        name='businessDescription'
                        size='lg'
                        placeholder='Business Description (min 20 characters)'
                        className='position-relative business-description'
                        value={formData.businessDescription}
                        onChange={handleChange}
                    />

                    {errors.businessDescription &&
                        errors.businessDescription.map((error, index) => (
                            <div className='error text-danger' key={index}>
                                {error}
                            </div>
                        ))}
                </Form.Group>

                {/*  */}

                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        name='businessImage'
                        size='lg'
                        placeholder='Business Image'
                        className='position-relative'
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                    />

                    {errors.businessImage &&
                        errors.businessImage.map((error, index) => (
                            <div className='error text-danger' key={index}>
                                {error}
                            </div>
                        ))}
                </Form.Group>

                {/*  */}

                <div className='d-grid'>
                    <Button type='submit' size='lg'>
                        Create Card
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
