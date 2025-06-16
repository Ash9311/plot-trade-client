import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsUserLoggedIn(true);
        setUser(userData);
    }

    const logout = () => {
        setIsUserLoggedIn(false);
        setUser(null);
    }

    return (
        <AppContext.Provider value={{ isUserLoggedIn, user, login, logout }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);