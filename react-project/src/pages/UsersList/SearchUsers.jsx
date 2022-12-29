import { useState } from 'react';
/* import Form from 'react-bootstrap/Form'; */
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SearchUsers(props) {
    const [text, setText] = useState('');
    const [searchChoice, setSearchChoice] = useState('');
    const [searchUserType, setSearchUserType] = useState(undefined);

    return (
        <>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Control
                        placeholder='Search'
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            props.onChange(e.target.value);
                        }}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                    <Form.Select
                        defaultValue='Choose...'
                        value={searchChoice}
                        onChange={(e) => {
                            setSearchChoice(e.target.value);
                            props.onChange(e.target.value);
                        }}
                    >
                        <option>Search by...</option>
                        <option>Email</option>
                        <option>First name</option>
                        <option>Last name</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group controlId='formGridState'>
                <Form.Select
                    defaultValue='Choose...'
                    value={searchUserType}
                    onChange={(e) => {
                        setSearchUserType(e.target.value);
                        props.onChange(e.target.value);
                    }}
                >
                    <option>User type...</option>
                    <option>User</option>
                    <option>Business</option>
                </Form.Select>
            </Form.Group>
        </>
    );
}
