import { Container } from 'react-bootstrap';
import '../../assets/styles/RegisterBusiness.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function RegisterBusiness() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container className='register-business-user-container d-grid h-100'>
            <Form
                className='register-business-user-form text-center w-100'
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <FontAwesomeIcon
                    icon={faUserTie}
                    className='fa-5x'
                ></FontAwesomeIcon>
                <h1 className='fs-3 fw-normal mb-3'>User</h1>

                <Form.Group
                    className='mb-3'
                    controlId='register-business-user-email-address'
                >
                    <Form.Control
                        required
                        type='email'
                        size='lg'
                        placeholder='Email address'
                        autoComplete='username'
                        className='position-relative'
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid Email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                    className='mb-3'
                    controlId='register-business-user-password'
                >
                    <Form.Control
                        required
                        type='password'
                        size='lg'
                        placeholder='Password'
                        autoComplete='new-password'
                        className='position-relative'
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Row className='mb-3'>
                    <Form.Group
                        className='mb-3'
                        as={Col}
                        md='6'
                        controlId='register-business-user-first-name'
                    >
                        <Form.Control
                            required
                            type='text'
                            size='lg'
                            placeholder='First name'
                            autoComplete='given-name'
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please enter your first name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        as={Col}
                        md='6'
                        controlId='register-business-user-last-name'
                    >
                        <Form.Control
                            required
                            type='text'
                            size='lg'
                            placeholder='Last name'
                            autoComplete='family-name'
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please enter your last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <div className='d-grid'>
                    <Button type='submit' size='lg'>
                        Sign-Up
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
