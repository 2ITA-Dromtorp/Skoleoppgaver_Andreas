import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext, useState } from 'react';

export default function Homepage() {
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { Firstname, setFirstname } = useContext(FirstnameContext);

    const username = sessionStorage.getItem("username");
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    console.log(sessionStorage)

    return (
        <div className="formDiv">
            <h1>Homepage</h1>
            { username ? (
            <h2>{username}</h2>
            ) : (
            <p>Du er ikke logget inn. PLs login</p>
            )
            }


        </div>
    );
}