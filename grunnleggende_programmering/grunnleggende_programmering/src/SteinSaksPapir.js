import { useState, useEffect } from 'react';
import spiller_stein from './images/spiller_stein.png'
import spiller_saks from './images/spiller_saks.png'
import spiller_papir from './images/spiller_papir.png'
let P1choice = ""

let P2choice = ""

let P2chooser = ""

let DataSRC = ""

let Win = false;

let Draw = false;

let Lose = false;

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
    } else if (P2chooser == -2) {
        P2choice = "Rock"
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
    }
    
    if (P2choice == "Paper") {
        console.log("FUCK")
        Win = false
        Lose = true
        Draw = false
        Wincheck = "Du tapte! ;("

    } else if (P2choice == "Rock") {
        console.log("Draw")
        Win = false
        Lose = false
        Draw = true
        Wincheck = "Uavgjort :("
    } else if (P2choice == "Scissors") {
        console.log("Win")
        Wincheck = "DU VANT!"
        Win = true
        Lose = false
        Draw = false
        console.log(Wincheck)
    }
    if (Win = true) {
        Wincheck = "DU VANT!"
    } else if (Draw = true) {
        Wincheck = "Uavgjort :("
    } else if (Lose = true) {
        Wincheck = "Du tapte! ;("
    } else {
        console.log("error")
       }
    // console.log(Wincheck);
}

function P1choosePaper() {
    P1choice = "Paper"
    // console.log(P1choice)
    P2chooser = Math.floor(Math.random() * (1-4));
    console.log(P2choice)
    if (P2chooser == -1) {
        P2choice = "Paper"
    } else if (P2chooser == -2) {
        P2choice = "Rock"
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
    }
    if (P2choice == "Paper") {
        console.log("Draw")
        Win = false
        Lose = false
        Draw = true
        
    } else if (P2choice == "Rock") {
        console.log("Win")
        Win =  true
        Lose = false
        Draw = false
    } else if (P2choice == "Scissors") {
        console.log("FUCK")
        Win = false
        Lose = true
        Draw = false
    }
    if (Win = true) {
        Wincheck = "DU VANT!"
    } else if (Draw = true) {
        Wincheck = "Uavgjort :("
    } else if (Lose = true) {
        Wincheck = "Du tapte! ;("
    } else {
        console.log("error")
       }
    // console.log(Wincheck);
}

function P1chooseScissors() {
    P1choice = "Scissors"
    // console.log(P1choice)
    P2chooser = Math.floor(Math.random() * (1-4));
    console.log(P2choice)
    if (P2chooser == -1) {
        P2choice = "Paper"
    } else if (P2chooser == -2) {
        P2choice = "Rock"
    } else if (P2chooser == -3) {
        P2choice = "Scissors"
    }
    if (P2choice == "Paper") {
        console.log("WIN")
        Win = true
        Lose = false
        Draw = false
    } else if (P2choice == "Rock") {
        console.log("FUCK")
        Win = false
        Lose = true
        Draw = false
    } else if (P2choice == "Scissors") {
        console.log("DRAW")
        Win = false
        Lose = false
        Draw = true
    }
    if (Win = true) {
        Wincheck = "DU VANT!"
    } else if (Draw = true) {
        Wincheck = "Uavgjort :("
    } else if (Lose = true) {
        Wincheck = "Du tapte! ;("
    } else {
     console.log("error")
    }
    // console.log(Wincheck);
}



    return(
        <>
            <p>Hallo</p>
            <img src={DataSRC}/>
            <div className='RSPDiv'>
            <button className='RSPButton' onClick={P1chooseRock}>Stein</button>
            <button className='RSPButton' onClick={P1chooseScissors}>Saks</button>
            <button className='RSPButton' onClick={P1choosePaper}>Papir</button>
            </div>
            <h1>Du {Wincheck}</h1>
        </>
    )

}

export default RPS