import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext, useState } from 'react';

export default function Homepage() {
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { Firstname, setFirstname } = useContext(FirstnameContext);


    return (
        <div className="formDiv">
            <h1>Homepage</h1>
            <h2>{Firstname}</h2>
        </div>
    );
}