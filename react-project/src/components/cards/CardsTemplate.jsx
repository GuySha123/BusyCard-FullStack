import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import CardDetails from './CardDetails';
import UpdateCard from './UpdateCard';

export default function CardsTemplate({ cards, onDelete }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserInfoContext);

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

    const getColumnsForRow = () => {
        let drawCards = sortedCards.map((c, i) => {
            return (
                <Col key={i}>
                    <Card
                        className={`business-card business-cards-${theme}`}
                        key={c._id}
                    >
                        {c.businessImage === 'businessDefaultCardImage' ? (
                            <Card.Img
                                className='business-card-image'
                                variant='top'
                                src={businessDefaultCardImage}
                            />
                        ) : (
                            <Card.Img
                                className={`business-card-image business-cards-image-${theme}`}
                                variant='top'
                                src={c.businessImage}
                                alt='Image not found'
                            />
                        )}
                        <Card.Body className='p-0'>
                            <Card.Title className='card-title pt-3 px-3'>
                                {c.businessName}
                            </Card.Title>
                            <hr />
                            <div className='px-3'>
                                <Card.Text className='col-10 text-truncate'>
                                    {c.businessDescription}
                                </Card.Text>
                                <Card.Text>{c.businessPhone}</Card.Text>
                                <Card.Text>{c.businessAddress}</Card.Text>
                                <CardDetails card={c} />
                            </div>
                            <Card.Footer className='card-footer w-100'>
                                <Row>
                                    <Col lg='8'>
                                        <small className='text-muted'>
                                            Last updated: {c.businessCreateDate}
                                        </small>
                                        <br />
                                        <small className='text-muted'>
                                            Card editor: {c.cardEditor}
                                        </small>
                                    </Col>
                                    {user && user.isAdminAccount ? (
                                        <>
                                            <Col lg='4'>
                                                <button
                                                    className={`buttons-${theme}`}
                                                    onClick={() =>
                                                        onDelete(c._id)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    ></FontAwesomeIcon>
                                                </button>
                                                <UpdateCard card={c} />
                                            </Col>
                                        </>
                                    ) : null}
                                </Row>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return drawCards;
    };

    return (
        <Row xs={1} md={2} xxl={3} className='g-4'>
            {getColumnsForRow()}
        </Row>
    );
}
