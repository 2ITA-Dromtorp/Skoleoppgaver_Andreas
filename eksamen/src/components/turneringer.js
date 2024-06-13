import axios from "axios";
import { useState, useEffect } from "react";

export default function Turneringer() {
    const [turneringer, setTurneringer] = useState([]);

    const brukerNavn = sessionStorage.getItem("username");
    const passord = sessionStorage.getItem("password");

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getTournaments', { brukerNavn, passord });
            setTurneringer(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="turneringContainer">
            {turneringer.map((turnering) => (
                <div className="turneringerDiv">
                    <img className="turneringerImg" src={turnering.turneringsBilde}/>
                    <h2 className="turneringerH2">{turnering.turneringsNavn}</h2>
                    <p className="turneringerP">{turnering.turneringsDato}</p>
                    <p className="turneringerP">{turnering.turneringsAdresse}</p>
                </div>
            ))}
        </div>
    );
}