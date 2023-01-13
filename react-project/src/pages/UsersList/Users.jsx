import React, { useContext, useEffect, useMemo, useState } from 'react';
import SearchUsers from '../../components/user-list/SearchUsers';
import UsersList from '../../components/user-list/UsersList';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import { deleteUser, getUsers } from '../../data/userStorage';
import SignIn from '../Sginin/SignIn';
/* Note: This page is for computer only */

export default function Users() {
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);
    const [users, setUsers] = useState([]);
    const [text, setText] = useState('');
    const [searchChoice, setSearchChoice] = useState('');
    const [searchUserType, setSearchUserType] = useState('');

    useEffect(() => {
        reRender();
    }, []);

    function onSearchChange(text, searchChoice, searchUserType) {
        setText(text);
        setSearchChoice(searchChoice);
        setSearchUserType(searchUserType);
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

    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const useTypePass =
                searchUserType === 'User type...' ||
                (u.isBusinessAccount && searchUserType === 'Business') ||
                (!u.isBusinessAccount && searchUserType === 'User') ||
                !searchUserType;

            const searchChoiceBy =
                searchChoice === 'Search by...' ||
                (u.email.toLowerCase().indexOf(text.toLowerCase()) > -1 &&
                    searchChoice === 'Email') ||
                (u.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 &&
                    searchChoice === 'First name') ||
                (u.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1 &&
                    searchChoice === 'Last name') ||
                !searchChoice;

            const searchPass =
                !text ||
                u.email.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                u.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                u.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1;
            return useTypePass && searchPass && searchChoiceBy;
        });
    }, [users, text, searchUserType, searchChoice]);

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
                                <SearchUsers onChange={onSearchChange} />
                                <UsersList
                                    users={filteredUsers}
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
