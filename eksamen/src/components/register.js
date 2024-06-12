import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        epost: '',
        passord: '',
        tlf: ''
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
                <input id="epost" type="text" placeholder="Epost" onChange={handleChange} value={formData.epost}/>
                <input id="passord" type="password" placeholder="Passord" onChange={handleChange} value={formData.passord} />
                <input id="tlf" type="text" placeholder="Tlf. nummer" onChange={handleChange} value={formData.tlf}/>
                <button type="submit">Registrer</button>
            </form>
            <Link to="/login">Eller logg inn</Link>
        </div>  
    )
}