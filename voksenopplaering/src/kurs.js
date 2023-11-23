import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import json from "./kursene";

export default function Profile() {
  const { kursnavn } = useParams();
  const [isMatchingProfile, setIsMatchingProfile] = useState(false);
  const [kursProfile, setKursProfile] = useState(null);



  useEffect(() => {
    const profile = json.kursene.find((kursting) => kursting.kurs === kursnavn);
    setKursProfile(profile);
    setIsMatchingProfile(profile !== undefined);
    console.log(profile)
  }, []);

  return (
    <>
      <div className="profile">
        <div className="profilecard">
          {isMatchingProfile ? (
            <>
              <p>{kursProfile.kurs}</p>
              <p>{kursProfile.kursbeskrivelse}</p>
            </>
          ) : (
            <p>No matching profile found.</p>
          )}
        </div>
      </div>
    </>
  );
}
