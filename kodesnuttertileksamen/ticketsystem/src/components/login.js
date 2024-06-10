import axios from 'axios';
import React, { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (event) => {

        console.log(formData);
        axios.post('/api/login', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
            event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Registrer</h1>
                <input id="username" type="text" placeholder="Brukernavn" onChange={handleChange} value={formData.username}/>
                <input id="password" type="password" placeholder="Passord" onChange={handleChange} value={formData.password} />
                <button type="submit">Registrer</button>
            </form>
        </div>  
    )
}