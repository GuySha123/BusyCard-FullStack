import React, { useContext, useEffect, useState } from 'react';
/* import SearchUsers from '../../components/user-list/SearchUsers'; */
import UsersList from '../../components/user-list/UsersList';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteUser, getUsers } from '../../data/userStorage';
import SignIn from '../Sginin/SignIn';

export default function Users() {
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        reRender();
    }, []);

    function onSearchChange(text /* , searchChoice, searchUserType */) {
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
        <>
            {!token && !user && !user.isAdminAccount ? (
                <SignIn />
            ) : (
                <>
                    <div className={`page-container body-${theme} h-100`}>
                        <div className={`page-content-container my-4`}>
                            <h1 className={'m-0'}>Users List</h1>
                            <section>
                                {/* <SearchUsers onChange={onSearchChange} /> */}
                                <UsersList
                                    users={users}
                                    onDelete={onDeleteClick}
                                />
                            </section>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
