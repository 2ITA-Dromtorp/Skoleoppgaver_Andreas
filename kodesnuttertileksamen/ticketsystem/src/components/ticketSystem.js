import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TicketSystem() {
    const [formData, setFormData] = useState({
        emne: '',
        beskrivelse: '',
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
        axios.post('/api/submitTicket', formData)
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
                <input id="emne" type="text" placeholder="Emne" onChange={handleChange} value={formData.emne}/>
                <input id="beskrivelse" type="text" placeholder="Beskrivelse" onChange={handleChange} value={formData.beskrivelse} />
                <button type="submit">Registrer</button>
            </form>
            <Link to="/login">Eller logg inn</Link>
        </div>  
    )
}