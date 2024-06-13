import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {

    const [adminStatus, setAdminStatus] = useState(false);

    const brukerNavn = sessionStorage.getItem("username");
    const passord = sessionStorage.getItem("password");

    const fetchData = async () => {
        if (brukerNavn && passord) {
        try {
            const response = await axios.post('/api/isUserAdmin', { brukerNavn, passord });
            setAdminStatus(response.data);
        } catch (error) {
            console.error(error);
        }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
  
    return (
<div className='pageContainer'>
    <h1>Velkommen til TicketSystem</h1>
    <Link to={"/turneringer"} className='homepageButton'>Turneringer</Link>
    <Link to={"/spillere"} className='homepageButton'>Spillere</Link>
    {adminStatus === "true" && <Link to={"/admin"} className='homepageButton'>Admin</Link>}
    {adminStatus === "true" && adminStatus}
</div>
    ); 
}

export default HomePage;