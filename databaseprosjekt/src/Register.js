import { useState, useEffect } from "react";
import axios from "axios";

function Register() {

    function encrypt(e) {
        e.preventDefault();
        let fornavn = document.getElementById('fornavn').value;
        let etternavn = document.getElementById('etternavn').value;
        let klasse = document.getElementById('klasse').value;
        let tlf = document.getElementById('tlf').value;
        let tlf_foresatte = document.getElementById('tlf_foresatte').value;
        let rolleID = document.getElementById('rolleID').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let userCredentials = {
            fornavn: fornavn,
            etternavn: etternavn,
            klasse: klasse,
            tlf: tlf,
            tlf_foresatte: tlf_foresatte,
            rolleID: rolleID,
            username: username,
            password: password
        };

        let registratorCredentials = sessionStorage.getItem("menneskeID")

        axios.post('/register', {"userCredentials": userCredentials, "registratorCredentials": registratorCredentials})
        .then(response => {
            console.log(response.data)
            if (response.data === "Bruker finnes allerede") {
                alert(response.data)
        }})
    }

    if (sessionStorage.getItem("isLoggedIn") == 1) {
        return (
            <h1>Du har ikke tilgang til denne siden.</h1>
        )
    } else {   
        return (
            <form className="formDiv" onSubmit={encrypt}>
            <label>Fornavn:</label>
            <input type="text" className='passwordInput' id='fornavn'/>
            <label>Etternavn:</label>
            <input type="text" className="passwordInput" id='etternavn'/>
            <label>Klasse</label>
            <input type="text" className="passwordInput" id='klasse'/>
            <label>Telefonnummer</label>
            <input type="number" className="passwordInput" id='tlf'/>
            <label>Foresattes telefonnummer</label>
            <input type="number" className="passwordInput" id='tlf_foresatte'/>
            <label>RolleID</label>
            <input type="number" className="passwordInput" id='rolleID'/>
            <label>brukernavn</label>
            <input type="text" className="passwordInput" id='username'/>
            <label>Passord</label>
            <input type="password" className="passwordInput" id='password'/>
            <input type="submit" value="Registrer bruker" className='loginButton'/>
        </form> 
        )
    }

}

export default Register