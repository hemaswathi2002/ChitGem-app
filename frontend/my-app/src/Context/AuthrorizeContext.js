import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext() 

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null) 

    // const handleLogin = (user) => {
    //     setUser(user) 
    // }

    // const handleLogout = () => {
    //     setUser(null) 
    // }

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Save user data to localStorage whenever it changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user')
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    )
}