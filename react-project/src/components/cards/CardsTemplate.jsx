import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import CardDetails from './CardDetails';
import UpdateCard from './UpdateCard';

export default function CardsTemplate({ cards, onDelete }) {
    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };
    const sortedCards = cards.sort((a, b) => {
        const dateA = parseDateString(a.businessCreateDate);
        const dateB = parseDateString(b.businessCreateDate);
        return dateB - dateA;
    });

    if (!cards) <div>No cards</div>;
    const columnsPerRow = 3;

    const getColumnsForRow = () => {
        let drawCards = sortedCards.map((c, i) => {
            return (
                <Col key={i}>
                    <Card style={{ width: '18rem' }} key={c._id}>
                        {c.businessImage === 'businessDefaultCardImage' ? (
                            <Card.Img
                                variant='top'
                                src={businessDefaultCardImage}
                            />
                        ) : (
                            <Card.Img
                                variant='top'
                                src={c.businessImage}
                                alt='Image not found'
                            />
                        )}
                        <Card.Body>
                            <Card.Title>{c.businessName}</Card.Title>
                            <Card.Text className='col-10 text-truncate'>
                                {c.businessDescription}
                            </Card.Text>
                            <Card.Text>{c.businessPhone}</Card.Text>
                            <Card.Text>{c.businessAddress}</Card.Text>
                            <CardDetails card={c} />
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
        <Row xs={1} md={columnsPerRow} className='g-4'>
            {getColumnsForRow()}
        </Row>
    );
}
