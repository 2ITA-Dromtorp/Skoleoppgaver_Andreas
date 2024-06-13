import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Spillere() {
    const [players, setPlayers] = useState([]);

    const brukerNavn = sessionStorage.getItem("username");
    const passord = sessionStorage.getItem("password");

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getPlayers', { brukerNavn, passord });
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {players.map((player) => (
                <div>
                    <p>{player.forNavn}</p>

                </div>
            ))}
        </div>
    )
}