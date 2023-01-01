import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteCard, getMyCards } from '../../data/cardStorage';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg';
import CardDetails from './CardDetails';
import UpdateCard from './UpdateCard';
import { UserInfoContext } from '../../context/UserInfoContext';

export default function ShowMyCards() {
    const [myCards, setMyCards] = useState([]);
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);
    const userId = user?._id;

    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };
    const sortedCards = myCards.sort((a, b) => {
        const dateA = parseDateString(a.businessCreateDate);
        const dateB = parseDateString(b.businessCreateDate);
        return dateB - dateA;
    });

    useEffect(() => {
        reRender();
    }, []);

    function onDeleteClick(id) {
        deleteCard(id, token)
            .then((res) => {
                reRender();
            })
            .catch((error) => console.error(error));
    }

    function reRender() {
        getMyCards(token, userId)
            .then((res) => {
                console.log(res);
                setMyCards([...res]);
            })
            .catch((error) => console.log(error.message));
    }

    // Check no cards
    if (!myCards) {
        return <div>No cards</div>;
    }
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
                                    Last updated: {c.businessCreateDate}
                                </small>
                                <br />
                                <small className='text-muted'>
                                    Card editor: {c.cardEditor}
                                </small>
                                <button onClick={() => onDeleteClick(c._id)}>
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
