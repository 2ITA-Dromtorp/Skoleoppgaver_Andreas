import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../admin.css';

export default function Admin() {
    console.log("admin")
    const [adminStatus, setAdminStatus] = useState(false);
    const [userFormData, setUserFormData] = useState({
        brukerNavn: '',
        passord: '',
        forNavn: '',
        etterNavn: '',
        sport: '2',
        tlf: '',
        foresatteTlf: ''
    });

    const [tournamentFormData, setTournamentFormData] = useState({
        turneringsNavn: '',
        turneringsDato: '',
        turneringsAdresse: '',
        turneringsSport: "1",
        turneringsBilde: '',
    });
    const handleUserChange = (event) => {
        const { id, value } = event.target;
        setUserFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleTournamentChange = (event) => {
        const { id, value } = event.target;
        setTournamentFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };



    const brukerNavn = sessionStorage.getItem("username");
    const passord = sessionStorage.getItem("password");

    const navigate = useNavigate();

    const fetchData = async () => {
        if (brukerNavn && passord) {
        try {
            const response = await axios.post('/api/isUserAdmin', { brukerNavn, passord });
            setAdminStatus(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUserSubmit = (event) => {

        console.log(userFormData);
        console.log(brukerNavn, passord);
        axios.post('/api/addUser', {userFormData, brukerNavn, passord})
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
            event.preventDefault();
    };

    const handleTournamentSubmit = (event) => {
        console.log(tournamentFormData);
        axios.post('/api/addTournament', {tournamentFormData, brukerNavn, passord})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
        event.preventDefault();
    };

    if (adminStatus === "false") {
        alert("Du har ikke tilgang til denne siden, logg inn som administrator om du ønsker tilgang.");
            navigate("/login")

    } else if (adminStatus === "true") {
    return (
<div class="admin-container">
    <h1>Admin</h1>
    <div class="formDiv">

        <form class="user-form" onSubmit={handleUserSubmit}>
            <h2>Opprett nytt bruker</h2>

            <label htmlFor="brukerNavn">Brukernavn:</label>
            <input type="text" id="brukerNavn" name="brukerNavn" onChange={handleUserChange} />

            <label htmlFor="passord">Passord:</label>
            <input type="text" id="passord" name="passord" onChange={handleUserChange} />

            <label htmlFor="forNavn">Fornavn:</label>
            <input type="text" id="forNavn" name="forNavn" onChange={handleUserChange} />

            <label htmlFor="etterNavn">Etternavn:</label>
            <input type="text" id="etterNavn" name="etterNavn" onChange={handleUserChange} />

            <label htmlFor='sport'>Sport:</label>
            <select id="sport" name="sport" onChange={handleUserChange}>
                <option value="2">Fotball</option>
                <option value="3">Håndball</option>
                <option value="4">Volleyball</option>
            </select>

            <label htmlFor="tlf">Tlf:</label>
            <input type="text" id="tlf" name="tlf" onChange={handleUserChange} />

            <label htmlFor="foresatteTlf">Tlf foresatte:</label>
            <input type="text" id="foresatteTlf" name="foresatteTlf" onChange={handleUserChange} />

            <button type="submit">Opprett</button>
        </form>

        <form class="tournament-form" onSubmit={handleTournamentSubmit}>

            <h2>Opprett ny turnering</h2>

            <label htmlFor="turneringsNavn">Turnering navn:</label>
            <input type="text" id="turneringsNavn" name="turneringsNavn" onChange={handleTournamentChange} />

            <label htmlFor="turneringsDato">Turnering dato:</label>
            <input type="date" id="turneringsDato" name="turneringsDato" onChange={handleTournamentChange} />

            <label htmlFor="turneringsAdresse">Turnering adresse:</label>
            <input type="text" id="turneringsAdresse" name="turneringsAdresse" onChange={handleTournamentChange} />

            <label htmlFor="turneringsSport">Turnering sport:</label>
            <select id="turneringsSport" name="turneringsSport" onChange={handleTournamentChange}>
                <option value="1">Fotball</option>
                <option value="2">Håndball</option>
                <option value="3">Volleyball</option>
            </select>

            <label htmlFor="turneringsBilde">Turnering bildebane:</label>
            <input type="text" id="turneringsBilde" name="turneringsBilde" onChange={handleTournamentChange} />

            <button type="submit">Opprett</button>
        </form>

    </div>
</div>
    );
}
}