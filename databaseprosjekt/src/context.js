import React, { createContext, useState } from 'react';
 
const FirstnameContext = createContext({});
const FirstnameProvider = ({ children }) => {
    const [Firstname, setFirstname] = useState("");
    return (
        <FirstnameContext.Provider value={{ Firstname, setFirstname }}>
            {children}
        </FirstnameContext.Provider>
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

export { IsLoggedInContext, IsLoggedInProvider, FirstnameContext, FirstnameProvider };