import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [formData, setFormData] = useState({
        brukerNavn: '',
        passord: ''
    });
    const [loginStatus, setLoginStatus] = useState('');


    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {


        axios.post('/api/login', formData)
            .then(response => {
                console.log(response.data);
                if(response.data.message === "Logget inn"){
                    sessionStorage.setItem("username", response.data.brukerNavn);
                    sessionStorage.setItem("password", response.data.passord);
                    setLoginStatus(response.data.message);
                    navigate("/");
                } else {
                    setLoginStatus(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
            event.preventDefault();
    };

    return (
        <div className='loginContainer'>
              <div className="loginCard">
              <h1 className='loginText'>Logg inn</h1>
            <form className='loginForm' onSubmit={handleSubmit}>

                <input className='loginInput' id="brukerNavn" type="text" placeholder="Brukernavn" onChange={handleChange} value={formData.brukerNavn}/>
                <input className='loginInput' id="passord" type="password" placeholder="Passord" onChange={handleChange} value={formData.passord} />
                <button className='loginButton' type="submit">Logg inn</button>
                <h2 className="loginStatus">{loginStatus}</h2>
            </form>
            </div>
        </div>  
    )
}