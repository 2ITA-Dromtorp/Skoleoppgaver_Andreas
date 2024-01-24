import React, { createContext, useState } from 'react';
 
const EmailContext = createContext({});
const EmailProvider = ({ children }) => {
    const [Email, setEmail] = useState("");
    return (
        <EmailContext.Provider value={{ Email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
};

const PasswordContext = createContext({});
const PasswordProvider = ({ children }) => {
    const [Password, setPassword] = useState("");
    return (
        <PasswordContext.Provider value={{ Password, setPassword }}>
            {children}
        </PasswordContext.Provider>
    );
};

const IsLoggedInContext = createContext({});
const IsLoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoggedInContext.Provider>
    );
};

export { IsLoggedInContext, IsLoggedInProvider, EmailContext, EmailProvider, PasswordContext, PasswordProvider };