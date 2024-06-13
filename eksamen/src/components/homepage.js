import { Link } from "react-router-dom";
import logo from "./images/logo.webp";

function HomePage() {

  
    return (
        <div className='pageContainer'>
            <h1>Velkommen til TicketSystem</h1>
            <Link to={"/turneringer"} className='homepageButton'>Turneringer</Link>
            <Link to={"/spillere"} className='homepageButton'>Spillere</Link>
        </div>
    ); 
}

export default HomePage;