import { useState, useEffect } from 'react';
import spiller_stein from './images/spiller_stein.png'
import spiller_saks from './images/spiller_saks.png'
import spiller_papir from './images/spiller_papir.png'
import usikker from "./images/maskin_ukjent.png"
let P1choice = ""

let P2choice = ""

let P2chooser = ""

// let DataSRC = ""

// let imageSrc = "http://localhost:3000/static/media/maskin_ukjent.5025606cb64ad3592d28.png"



let Wincheck = "";
// function P2chose() {
//     console.log(P2chooser)
// }
function RPS() {
function P1chooseRock() {
    P1choice = "Rock"
    // console.log(P1choice)
    P2chooser = Math.floor(Math.random() * (1-4));
    console.log(P2choice)       

    if (P2chooser == -1) {
        P2choice = "Paper"
        setImageSrc2('http://localhost:3000/static/media/spiller_papir.b2147c7f6e18a1045155.png');
        setvarCount(varCount + 1)
        Wincheck = "Du tapte! ;("
    } else if (P2chooser == -2) {
        P2choice = "Rock"
        setImageSrc2('http://localhost:3000/static/media/spiller_stein.ab12836449331578c253.png');
        setvarCount2(varCount2 + 1)
        Wincheck = "Uavgjort :("
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
        setImageSrc2('http://localhost:3000/static/media/spiller_saks.cca7bfaa16770d465603.png');
        setvarCount3(varCount3 + 1)
        setWincount(WinCount + 1)
        Wincheck = "DU VANT!"
    }
    
    if (P2choice == "Paper") {
        console.log("FUCK")


        setLosecount(LoseCount + 1)

    } else if (P2choice == "Rock") {
        console.log("Draw")


    } else if (P2choice == "Scissors") {
        console.log("Win")


        console.log(Wincheck)
    } else {
        console.log("ERROR")
    }

    // console.log(Wincheck);
    console.log(Wincheck)

    console.log(Win)
    console.log(P2choice)
    // DataSRC = "{spiller_stein}"
    setImageSrc('http://localhost:3000/static/media/spiller_stein.ab12836449331578c253.png');

}

function P1choosePaper() {
    P1choice = "Paper"
    // console.log(P1choice)
    P2chooser = Math.floor(Math.random() * (1-4));
    console.log(P2choice)
    if (P2chooser == -1) {
        P2choice = "Paper"
        setImageSrc2('http://localhost:3000/static/media/spiller_papir.b2147c7f6e18a1045155.png');
        Wincheck = "Uavgjort :("

    } else if (P2chooser == -2) {
        P2choice = "Rock"
        setImageSrc('http://localhost:3000/static/media/spiller_stein.ab12836449331578c253.png');
        Wincheck = "DU VANT!"
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
        setImageSrc2('http://localhost:3000/static/media/spiller_saks.cca7bfaa16770d465603.png');
        Wincheck = "Du tapte! ;("
    }
    if (P2choice == "Paper") {
        console.log("Draw")

        
    } else if (P2choice == "Rock") {
        console.log("Win")

        setWincount(WinCount + 1)
    } else if (P2choice == "Scissors") {
        console.log("FUCK")

        setLosecount(LoseCount + 1)
    }

    // console.log(Wincheck);
    setImageSrc('http://localhost:3000/static/media/spiller_papir.b2147c7f6e18a1045155.png');
}


function P1chooseScissors() {
    P1choice = "Scissors"
    // console.log(P1choice)
    P2chooser = Math.floor(Math.random() * (1-4));
    console.log(P2choice)
    if (P2chooser == -1) {
        P2choice = "Paper"
        setImageSrc2('http://localhost:3000/static/media/spiller_papir.b2147c7f6e18a1045155.png');
        Wincheck = "DU VANT!"
    } else if (P2chooser == -2) {
        P2choice = "Rock"
        setImageSrc('http://localhost:3000/static/media/spiller_stein.ab12836449331578c253.png');
        Wincheck = "Du tapte! ;("
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
        setImageSrc2('http://localhost:3000/static/media/spiller_saks.cca7bfaa16770d465603.png');
        Wincheck = "Uavgjort :("
    }
    if (P2choice == "Paper") {
        console.log("WIN")

        setWincount(WinCount + 1)
    } else if (P2choice == "Rock") {
        console.log("FUCK")

        setLosecount(LoseCount + 1)
    } else if (P2choice == "Scissors") {
        console.log("DRAW")

    }

    // console.log(Wincheck);
    setImageSrc('http://localhost:3000/static/media/spiller_saks.cca7bfaa16770d465603.png');
}
  const [imageSrc, setImageSrc] = useState('http://localhost:3000/static/media/maskin_ukjent.5025606cb64ad3592d28.png');
    const [DataSRC, setDataSRC] = useState(0);

    function changeSRC() {
        setDataSRC(DataSRC = "{spiller_stein}")
    }

    const [imageSrc2, setImageSrc2] = useState('http://localhost:3000/static/media/maskin_ukjent.5025606cb64ad3592d28.png');
    const [DataSRC2, setDataSRC2] = useState(0);

    
    const [varCount, setvarCount] = useState(0);
    const [varCount2, setvarCount2] = useState(0);
    const [varCount3, setvarCount3] = useState(0);

    const [WinCount, setWincount] = useState(0);
    const [LoseCount, setLosecount] = useState(0);
    function changeSRC2() {
        setDataSRC(DataSRC2 = "{spiller_stein}")
    }


    return(
        <>
            <h1>Stein Saks Papir</h1>
            <h2>Spiller</h2>
            <img src={imageSrc}/>
            <div className='RSPDiv'>
            <button className='RSPButton' onClick={P1chooseRock}>Stein</button>
            <button className='RSPButton' onClick={P1chooseScissors}>Saks</button>
            <button className='RSPButton' onClick={P1choosePaper}>Papir</button>
            </div>
            <h2>Datamaskin</h2>
            <img src={imageSrc2}/>
            <h1>{Wincheck}</h1>
            <h2>Du har vunnet {WinCount} ganger</h2>
            <h2>Datamaskinen har vunnet {LoseCount} ganger</h2>
            <p>Datamaskinen har valgt stein {varCount} ganger</p>
            <p>Datamaskinen har valgt papir {varCount2} ganger</p>
            <p>Datamaskinen har valgt saks {varCount3} ganger</p>
            
        </>
    )

}

export default RPS