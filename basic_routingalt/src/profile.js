import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileIMG from "./images/profile-image.jpg"

export default function Profile() {

    const { profile } = useParams();
    const navigate = useNavigate();


    console.log(profile);

    return (
        <>
        <div className="profile">
        <div className="profilecard">
        <h1> Profilen til {profile} </h1>
        <img src={profileIMG}></img>
        <p>Tlf.: 10330023</p>
        <button onClick={() => navigate("/")}>Til hovedmeny</button>
        </div>
        </div>
        </>
    )
}