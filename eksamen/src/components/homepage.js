import { Link } from "react-router-dom";


function HomePage() {

  
    return (
        <div className='pageContainer'>
            <h1>Velkommen til TicketSystem</h1>
            <Link to={"/ticket"} className='homepageButton'>Opprett en ticket</Link>
        </div>
    ); 
}

export default HomePage;