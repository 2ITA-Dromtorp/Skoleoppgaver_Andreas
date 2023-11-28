import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();
    let Userinformation = "Du er ikke logget inn. Vennligst logg inn.";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    let isLoggedIn = false;

    const handleSubmit = (e) => {

        const dataToSend = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        e.preventDefault();
        // Do something with the input data
        console.log(email, password, firstName, lastName);
        Userinformation = email;
        fetch('/create-user', {
            method:'POST',
            headers:{
              "content-type":"application/json",
            },
            body:JSON.stringify(dataToSend),
        })
        .then(async (res) => {
                        const data = await res.json();
                        console.log(data);

                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
                    
                    navigate("/");



    };

 if (isLoggedIn === true) {
    return (
        <p>LOGGET INN!</p>
    )
 } else {
       
    return (
        <main>
            <p>{email}</p>
            <div className='loginForm'>

                <form onSubmit={handleSubmit}>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                         <label htmlFor="email">E-Post:</label>
                        </div>
                        <div className='labelDiv'>
                        <input
                            className='textInput'
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className='loginDiv'>
                        <div className='logintextDiv'>
                        <label htmlFor="password">Passord:</label>
                        </div>
                        <div className='labelDiv'>
                        <input
                            className='textInput'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className='loginDiv'>
                        <div className='logintextDiv'> 
                        <label htmlFor="firstName">Fornavn:</label>
                        </div>
                        <div className='labelDiv'>
                        <input
                            className='textInput'
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className='loginDiv'>
                        <div className='logintextDiv'>
                        <label htmlFor="lastName">Etternavn:</label>
                        </div>
                        <div className='labelDiv'>
                        <input
                            className='textInput'
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        </div>
                        </div>
                        <div className='submitDiv'>
                        <input className='submitButton' type="submit" value="Registrer deg" />
 
                        </div>

                    </form>
            </div>
        </main>
    );
 }
}

export default LoginPage;