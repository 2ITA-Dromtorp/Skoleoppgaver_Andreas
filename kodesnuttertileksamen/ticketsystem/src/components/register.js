import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        fornavn: '',
        etternavn: '',
        username: '',
        epost: '',
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
        axios.post('/api/register', formData)
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
                <input id="fornavn" type="text" placeholder="Fornavn" onChange={handleChange} value={formData.fornavn}/>
                <input id="etternavn" type="text" placeholder="Etternavn"  onChange={handleChange} value={formData.etternavn}/>
                <input id="username" type="text" placeholder="Brukernavn" onChange={handleChange} value={formData.username}/>
                <input id="epost" type="text" placeholder="Epost" onChange={handleChange} value={formData.epost}/>
                <input id="password" type="password" placeholder="Passord" onChange={handleChange} value={formData.password} />
                <button type="submit">Registrer</button>
            </form>
            <Link to="/login">Eller logg inn</Link>
        </div>  
    )
}