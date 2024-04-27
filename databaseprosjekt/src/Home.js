import axios from 'axios';
import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { Firstname, setFirstname } = useContext(FirstnameContext);

    const username = sessionStorage.getItem("username");
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    console.log(sessionStorage)

    const [salt, setSalt] = useState("");
    //skibidi dop dop dop yes yes.

    function generateSalt() {
        const min = 33;
        const max = 126;
      
        const salt = Array.from({ length: 10 }, () =>
          String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)
        ).join('');
      
        setSalt(salt);
    }

    function coffee() {
        axios.get('/coffee').then((response) => {
            setSalt(response.data);
        })
    }



    return (
        <div className="formDiv">
            <h1>Homepage</h1>
            <button onClick={generateSalt}>Generer Salt</button>

            <h2>{salt}</h2>

            { username ? (
            <>
            <h2>{username}</h2>
            <Link to={"/equipmentTable"}><button >Utstyr</button></Link>
            </>
            ) : (
            <p>Du er ikke logget inn. PLs login</p>
            )
            }


        </div>
    );
}