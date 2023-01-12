import React, { createContext } from 'react';
import { useUserStorage } from '../hooks/useUserStorage';

export const UserTokenContext = createContext();

export default function UserTokenContextProvider({ children }) {
    const value = useUserStorage();

    return (
        <UserTokenContext.Provider value={value}>
            {children}
        </UserTokenContext.Provider>
    );
}
