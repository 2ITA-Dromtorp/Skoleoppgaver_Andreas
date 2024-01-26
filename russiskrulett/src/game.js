import { Link } from "react-router-dom";
import { BulletAmountContext } from "./context";
import { useState, useEffect, useContext } from 'react';
import Gun from "./images/gun.png";
import Explosion from "./images/bigexplosion.jpg";

export default function Game() {
    let { bulletAmount, setBulletAmount } = useContext(BulletAmountContext);
    const [status, setStatus] = useState('Ingen har skutt ennå')
    const [gun, setGun] = useState('gun0')
    let [currentChambered, setCurrentChambered] = useState(0);
    let [bulletLocation, setBulletLocation] = useState(0);
    const[imgSRC, setImgSRC ] = useState({id: null, image: Gun});
    // const [playerChoice, setPlayerChoice] = useState({id: null, image: ukjent})

    function loading() {

        const newBulletLocation = Math.floor(Math.random() * 6);

        setBulletLocation(newBulletLocation);
        if (bulletLocation === 0) {
            setGun("gun0");
        }
        if (bulletLocation === 1) {
            setGun("gun1");        }
        if (bulletLocation === 2) {
            setGun("gun2");        }
        if (bulletLocation === 3) {
            setGun("gun3");        }
        if (bulletLocation === 4) {
            setGun("gun4");        }
        if (bulletLocation === 5) {
            setGun("gun5");        }
            setStatus("Du lever")
            setImgSRC({id: 2, image: Gun});
        console.log(newBulletLocation);
        return newBulletLocation;


    }

    function shooter(newBulletLocation) {
        if (bulletLocation === 5) {
            console.log("Du er død")
            setStatus("Du er død")
            setImgSRC({id: 2, image: Explosion});

        } else {
            console.log("Du vant")
            setStatus("Du lever")
            setImgSRC({id: 2, image: Gun});
        }

        if (bulletLocation === 0) {
            setGun("gun0");
        }
        if (bulletLocation === 1) {
            setGun("gun1");        }
        if (bulletLocation === 2) {
            setGun("gun2");        }
        if (bulletLocation === 3) {
            setGun("gun3");        }
        if (bulletLocation === 4) {
            setGun("gun4");        }
        if (bulletLocation === 5) {
            setGun("gun5");        }

        if (bulletLocation > 4) {
            setBulletLocation(bulletLocation - 5);
        } else {
            setBulletLocation(bulletLocation + 1);
        }
        // console.log(bulletLocation)

    }
    

    return (
        <div> 
            <Link to="/">Home</Link>
            <h1>Game</h1>
            
            <input
                className='textInput'
                type="text"
                id="klasse"
                value={bulletAmount}
                onChange={(e) => setBulletAmount(e.target.value)}
            />
            
            <button onClick={loading}>Load</button>
            <button onClick={shooter}>Skyt</button>
            <p>{bulletAmount}</p>
            <img className={gun} src={imgSRC.image} alt='spiller ukjent'/>
            <h2>{status}</h2>
            <h1>Tabell</h1>
            
        </div>
    )
}

