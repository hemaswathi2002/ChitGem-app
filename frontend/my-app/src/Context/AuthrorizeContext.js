// import React, { createContext, useContext, useState, useEffect } from 'react'

// const AuthContext = createContext() 

// export const useAuth = () => {
//     return useContext(AuthContext)
// }

// export const AuthProvider = ({ children }) => {
//     // const [user, setUser] = useState(null) 

//     // const handleLogin = (user) => {
//     //     setUser(user) 
//     // }

//     // const handleLogout = () => {
//     //     setUser(null) 
//     // }

//     const [user, setUser] = useState(() => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (error) {
//             console.error('Error parsing user data:', error);
//             return null;
//         }

//     });

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if(storedUser){
//             setUser(JSON.parse(storedUser))
//         }else {
//             setUser(null);
//         }
//     }, []);
    

//     const handleLogin = (userData) => {
//         setUser(userData)
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     const handleLogout = () => {
//         setUser(null);
//         localStorage.removeItem('user')
//     };

//     return (
//         <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
//             { children }
//         </AuthContext.Provider>
//     )
// }

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                // If parsing fails, remove the invalid data from localStorage
                localStorage.removeItem('user');
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    );
}
