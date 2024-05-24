import { Link } from "react-router-dom";
import axios from "axios";

export default function Homepage() {

    function nyVare() {
        const username = prompt("Skriv inn brukernavn")
        const password = prompt("Skriv inn passord")
        axios.post('/nyeVarer', {
            username:username,
            password:password
        }).then((response) => {
            alert(response.data)
            console.log(response.data)
        })
    }

    return (
        <div className="homepageContainer">
            <div className="homepageButtonDiv">
                <Link to="/products"><button className="homepageButton">Meny</button></Link>
            </div>
            <div className="homepageButtonDiv" style={{"margin-top": "10px"}}>
            <a><button className="homepageButton" onClick={nyVare}>Nye varer (admin)</button></a>
            </div>
        </div>
    );
}