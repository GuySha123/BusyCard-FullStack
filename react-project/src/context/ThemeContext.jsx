import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme());

    useEffect(() => {
        const expires = new Date();
        const day = 24 * 60 * 60 * 1000;
        expires.setTime(expires.getTime() + 30 * day);

        document.body.classList.add(theme);
        document.cookie = `theme=${theme}; expires=${expires.toUTCString()}`;
    }, [theme]);

    function getInitialTheme() {
        const storedTheme = document.cookie.replace(
            /(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        return storedTheme || 'light';
    }

    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        } else {
            null;
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
