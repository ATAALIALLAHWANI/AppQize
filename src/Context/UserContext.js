import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <UserContext.Provider value={{ username, setUsername, email, setEmail, password, setPassword }}>
            {children}
        </UserContext.Provider>
    );
};
