import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap';
import UpdateUser from '../../components/users/UpdateUser';


export default function UsersList({ users, onDelete }) {
    if (!users) return <div>No users</div>;

    let usersRows = users.map((u, i) => {
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                {u.isBusinessAccount ? <td>Business <FontAwesomeIcon icon={faUserTie} className="fa-2x"></FontAwesomeIcon></td> : <td>User <FontAwesomeIcon icon={faUser} className="fa-2x"></FontAwesomeIcon></td> }
                {/* <td>{u.isBusinessAccount}</td> */}
                <td><button onClick={() => onDelete(u._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></td>
                <td><UpdateUser /></td>
            </tr>
        )
    });

    return (
        <>
            <p>Users: {`(${users.length})`}</p>
            <Table className='text-center' striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>User Type</td>
                        <td>Delete</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody>{usersRows}</tbody>
            </Table>
        </>
    )
}
