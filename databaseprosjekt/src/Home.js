import axios from 'axios';
import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { Firstname, setFirstname } = useContext(FirstnameContext);

    if (sessionStorage.getItem("menneskeID") == null) {
        window.location.href = "/login"
    }

    const username = sessionStorage.getItem("username");
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    console.log(sessionStorage)







    return (
        <div className="formDiv">
            <h1>Drømtorp Utlån</h1>
            { username ? (
            <>
            <h2>Logget inn som: {username}</h2>
            <div className='homePageButtons'>
            <Link to={"/equipmentTable"}><button >Utstyr</button></Link>
            <Link to={"/studentTable"}><button >Elevliste</button></Link>
            <Link to={"/Foresporseller"}><button >Bestillinger</button></Link>	
            {sessionStorage.getItem("rolleID") != 1 ? <Link to={"/register"}><button >Opprett ny bruker</button></Link> : null}
            </div>
            </>
            ) : (
            <p>Du er ikke pålogget. </p>
            )
            }


        </div>
    );
}