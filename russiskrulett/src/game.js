import { Link } from "react-router-dom";
import { BulletAmountContext } from "./context";
import { useState, useEffect, useContext } from 'react';

export default function Game() {
    let { bulletAmount, setBulletAmount } = useContext(BulletAmountContext);

    let [currentChambered, setCurrentChambered] = useState(0);
    let [bulletLocation, setBulletLocation] = useState(0);

    useEffect(() => {
        // This effect could be used to initialize the game or similar.
        // It will run once on component mount since the dependency array is empty.
    }, []);

    function loading() {
        const newBulletLocation = Math.floor(Math.random() * 6);
        setBulletLocation(newBulletLocation);
        // console.log(newBulletLocation);
        return newBulletLocation;
    }

    function shooter(newBulletLocation) {
        if (bulletLocation === 5) {
            console.log("Du er død")
        } else {
            console.log("Du vant")
        }


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
            <h2>{wincheck}</h2>
        </div>
    )
}
