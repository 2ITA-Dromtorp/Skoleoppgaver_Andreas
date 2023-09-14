import { useState, useEffect } from 'react';

let P1choice = ""

let P2choice = ""

let P2chooser = ""

let Win = false;

let Draw = false;

let Lose = false;

let Wincheck = "";
// function P2chose() {
//     console.log(P2chooser)
// }
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
    } else if (P2choice == "Rock") {
        console.log("Draw")
        Win = false
        Lose = false
        Draw = true
    } else if (P2choice == "Scissors") {
        console.log("Win")
        Win = true
        Lose = false
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

function RPS() {

    return(
        <>
            <p>Hallo</p>
            <button onClick={P1chooseRock}>Stein</button>
            <button onClick={P1chooseScissors}>Saks</button>
            <button onClick={P1choosePaper}>Papir</button>
            <h1>{Wincheck}</h1>
        </>
    )

}

export default RPS