import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserByToken } from '../data/userStorage';
import { LoginContext } from './LoginContext';
import { UserTokenContext } from './UserTokenContext';

export const UserInfoContext = createContext();

export default function UserInfoContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const { token } = useContext(UserTokenContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            getUserByToken(token).then((user) => {
                setUser(user);
            });
            setLoggedIn(true);
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <UserInfoContext.Provider value={{ user }}>
            {children}
        </UserInfoContext.Provider>
    );
}
