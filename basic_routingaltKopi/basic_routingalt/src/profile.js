import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profileIMG from "./images/profile-image.jpg"
import json from "./profiles"
import { useState } from "react";

export default function Profile() {

    const {profile} = useParams();
    const navigate = useNavigate();

    console.log(json.elever)
    console.log(json.elever[0].navn)
    console.log({profile})

    // console.log(profile);
    const [isMatchingProfile, setIsMatchingProfile] = useState(false);


    if (profile == json.elever[0].navn) {
        console.log("AOPIJFAPSFJAPFOIJ")
    } else {
        console.log("Error du er ikke kul")
    }

    const studentProfile = json.elever.find((student) => student.navn === profile);
    setIsMatchingProfile(studentProfile !== undefined);
    console.log({studentProfile})
        // const map1 = json.map((x) => x);
        // console.log(map1);


    return (
        <>
      <div className="profile">
        <div className="profilecard">
          <h1>Profilen til {profile}</h1>
          {studentProfile ? (
            <>
              <img src={profileIMG} alt={profile} />
              <div className="profText">
                <p>Klasse: {studentProfile.klasse}</p>
                <p>Tlf.: {studentProfile.tlf}</p>
                <p>E-post: {studentProfile.email}</p>
              </div>
            </>
          ) : (
            <p>Finnes ikke GRRRRRRRRR</p>
          )}
          <button className="profBut" onClick={() => navigate("/")}>
            Tilbake
          </button>
        </div>
      </div>
    </>

    )
}