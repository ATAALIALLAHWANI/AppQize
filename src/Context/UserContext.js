import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [challengeId, setChallengeID] = useState('');

    return (
        <UserContext.Provider value={{ username, setUsername, email, setEmail, password, setPassword, id, setId, challengeId, setChallengeID }}>
            {children}
        </UserContext.Provider>
    );
};
