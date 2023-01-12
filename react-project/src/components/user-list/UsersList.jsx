import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/styles/user/UserList.css';
import UpdateUser from '../../components/users/UpdateUser';
import { ThemeContext } from '../../context/ThemeContext';
import DeleteMsgClient from '../messages/DeleteMsgClient';

export default function UsersList({ users, onDelete }) {
    const { theme } = useContext(ThemeContext);
    if (!users) return <div>No users</div>;

    let usersRows = users.map((u, i) => {
        if (u.isAdminAccount) {
            users.splice(i, 1);
        }
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                {u.isBusinessAccount ? (
                    <td>
                        Business{' '}
                        <FontAwesomeIcon
                            icon={faUserTie}
                            className='fa-2x'
                        ></FontAwesomeIcon>
                    </td>
                ) : (
                    <td>
                        User{' '}
                        <FontAwesomeIcon
                            icon={faUser}
                            className='fa-2x'
                        ></FontAwesomeIcon>
                    </td>
                )}
                <td>
                    <DeleteMsgClient user={u} id={i} onDelete={onDelete} />
                </td>
                <td>
                    <UpdateUser users={u} />
                </td>
            </tr>
        );
    });

    return (
        <>
            <p>Users: {`(${users.length})`}</p>
            <Table
                className={`text-center`}
                striped
                bordered
                hover
                variant={theme === 'light' ? '' : 'dark'}
            >
                <thead className={`list-title`}>
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
    );
}
