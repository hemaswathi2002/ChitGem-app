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
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }else {
            setUser(null);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData));
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