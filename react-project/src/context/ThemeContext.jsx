import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

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
