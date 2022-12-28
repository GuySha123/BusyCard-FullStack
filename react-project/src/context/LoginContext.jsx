import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.access ? true : false
    );
    console.log(loggedIn);

    function changeLoggedIn(value) {
        setLoggedIn(value);
        if (value === false) {
            localStorage.clear();
        }
    }

    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            {children}
        </LoginContext.Provider>
    );
}
