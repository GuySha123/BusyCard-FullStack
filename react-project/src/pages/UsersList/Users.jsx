import React, { useEffect, useState, useContext } from 'react';
import { getUsers, deleteUser } from '../../data/storage';
import SearchUsers from './SearchUsers';
import UsersList from './UsersList';
import { LoginContext } from '../../context/LoginContext';

export default function Users() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        reRender();
    }, []);

    function onSearchChange(text, searchChoice, searchUserType) {
        getUsers()
            .then((userJSON) => {
                let tus = userJSON.filter((u) => {
                    return (
                        u.email.toLowerCase().indexOf(text) > -1 ||
                        u.firstName.toLowerCase().indexOf(text) > -1 ||
                        u.lastName.toLowerCase().indexOf(text) > -1
                    );
                });
                setUsers(tus);
            })
            .catch((error) => alert(error.message));
    }

    function onDeleteClick(id) {
        deleteUser(id)
            .then((res) => {
                reRender();
            })
            .catch((error) => alert(error.message));
    }

    function reRender() {
        getUsers()
            .then((res) => {
                console.log(res);
                setUsers([...res]);
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className='h-100'>
            <h2>Users List</h2>
            <section>
                <SearchUsers onChange={onSearchChange} />
                <UsersList users={users} onDelete={onDeleteClick} />
            </section>
        </div>
    );
}
