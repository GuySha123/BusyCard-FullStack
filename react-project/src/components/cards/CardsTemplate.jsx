import React from 'react'
import { Card, Button, } from 'react-bootstrap';
import businessDefaultCardImage from '../../assets/images/cards/businesscard1015419960720.jpg'

export default function CardsTemplate({ cards }) {
    if (!cards) <div>No cards</div>;

    let drawCards = cards.map((c, i) => {
        return (
            <Card style={{ width: '18rem' }} key={i}>
                {c.businessImage === 'businessDefaultCardImage' ? <Card.Img variant="top" src={businessDefaultCardImage} /> : <Card.Img variant="top" src={c.businessImage} />}
                <Card.Body>
                    <Card.Title>{c.businessName}</Card.Title>
                    <Card.Text>{c.businessDescription}</Card.Text>
                    <Card.Text>{c.businessPhone}</Card.Text>
                    <Card.Text>{c.businessAddress}</Card.Text>
                    <div className="card-footer">
                        <small className="text-muted">{c.businessCreateDate}</small>
                    </div>
                </Card.Body>
            </Card>
        )
    });
    return (
        <>
            <div>{drawCards}</div>
        </>
    )
}
