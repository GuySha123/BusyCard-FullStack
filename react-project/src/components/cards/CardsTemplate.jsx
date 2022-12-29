import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import { LoginContext } from '../../context/LoginContext';
import UpdateCard from './UpdateCard';

export default function CardsTemplate({ cards, onDelete }) {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    if (!cards) <div>No cards</div>;
    const columnsPerRow = 3;

    const getColumnsForRow = () => {
        let drawCards = cards.map((c, i) => {
            return (
                <Col key={i}>
                    <Card style={{ width: '18rem' }} key={c._id}>
                        {c.businessImage === 'businessDefaultCardImage' ? (
                            <Card.Img
                                variant='top'
                                src={businessDefaultCardImage}
                            />
                        ) : (
                            <Card.Img variant='top' src={c.businessImage} />
                        )}
                        <Card.Body>
                            <Card.Title>{c.businessName}</Card.Title>
                            <Card.Text>{c.businessDescription}</Card.Text>
                            <Card.Text>{c.businessPhone}</Card.Text>
                            <Card.Text>{c.businessAddress}</Card.Text>
                            <div className='card-footer'>
                                <small className='text-muted'>
                                    {c.businessCreateDate}
                                </small>
                                <button onClick={() => onDelete(c._id)}>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                    ></FontAwesomeIcon>
                                </button>
                                <UpdateCard card={c} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return drawCards;
    };

    return (
        <Row xs={1} md={columnsPerRow}>
            {getColumnsForRow()}
        </Row>
    );
}
