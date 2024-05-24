import axios from "axios";

export default function admin() {

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

return(
    <div className="homepageContainer">
        <div className="homepageButtonDiv" style={{"margin-top": "10px"}}>
            <a><button className="homepageButton" onClick={nyVare}>Legg til nye varer</button></a>
        </div>
    </div>
)}