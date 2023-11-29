import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import json from "./kursene";
import placeholder from "./images/melvin.jpg"

export default function Profile() {
  const { kursnavn } = useParams();
  const [isMatchingProfile, setIsMatchingProfile] = useState(false);
  const [kursProfile, setKursProfile] = useState(null);
  const [tekst, setTekst] = useState(false);




  useEffect(() => {
    const profile = json.kursene.find((kursting) => kursting.kurs === kursnavn);
    setKursProfile(profile);
    setIsMatchingProfile(profile !== undefined);
    console.log(profile)
  }, []);

  const handleclick = () => {
    setTekst(!tekst)
  }

  return (
    <>
    <main className="kursMain">
      <div className="profile">
        <div className="profilecard">
          {isMatchingProfile ? (
            <>
              <h1>{kursProfile.kurs}</h1>
              <div></div>
              <div className="kursetIMGDiv">
              <img className="kursetIMG" src={kursProfile.imgsrc}/>
              </div>
              <table>
                <tr>
                  <th>Dager</th>
                  <th>Klokkeslett</th>
                </tr>
                <tr>
                  <td>Mandag</td>
                  <td>9:30-11:00</td>
                </tr>
                <tr>
                  <td>Onsdag</td>
                  <td>10:00-11:30</td>
                </tr>
                <tr>
                  <td>Torsdag</td>
                  <td>10:30-12:00</td>
                </tr>
              </table>
              {tekst?<button onClick={handleclick} className="kursetButton">Meld deg på</button>:<button onClick={handleclick} className="kursetButton">Meld deg av</button>}

              
              <p className="kursetbeskrivelse">{kursProfile.kursbeskrivelse}</p>

            </>
          ) : (
            <p>No matching profile found.</p>
          )}
        </div>
      </div>
      </main>
    </>
  );
}
