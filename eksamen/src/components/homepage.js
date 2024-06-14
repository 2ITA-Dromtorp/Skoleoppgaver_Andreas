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

    function logout() {
        sessionStorage.clear();
        window.location.reload();
    }
  
    return (
<div className='pageContainer'>
    <Link to={"/turneringer"} className='homepageButton'>Turneringer</Link>
    {adminStatus === "true" && <Link to={"/admin"} className='homepageButton'>Admin</Link>}
    {brukerNavn && <a onClick={logout} style={{color: "blue", textDecoration: "underline"}}>Logg ut</a>}
</div>
    ); 
}

export default HomePage;