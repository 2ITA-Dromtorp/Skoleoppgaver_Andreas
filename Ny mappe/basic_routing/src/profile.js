import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileIMG from './images/profile-image.jpg'
import json from './profiles'
import { useEffect, useState } from 'react'

export default function Profile() {

    const { profile } = useParams();
    const navigate = useNavigate();
    console.log(profile);

                
    const [student, setStudent] = useState({});

    useEffect(() => {

    json.elever.map((item, index) => {
        if (profile == item.navn) {
            console.log(item);
            setStudent(item)
        }
    })

 }, [])

    return (
        <>
            <div className="profile">
                <div className="profilecard">
                    <h1> {profile} </h1>
                    <img src={profileIMG}></img>
                        <p>Klasse: {student.klasse}</p>
                        <p>E-mail: {student.email}</p>
                        <p>Tlf.: {student.tlf}</p>
                    <button onClick={() => navigate("/")}>Til hovedmeny</button>
                </div>
            </div>
        </>
    )
}