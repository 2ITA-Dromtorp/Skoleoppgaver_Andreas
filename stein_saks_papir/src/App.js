import logo from './logo.svg';
import './App.css';
import ukjent from './images/maskin_ukjent.png'
import spiller_papir from './images/spiller_papir.png'
import spiller_stein from './images/spiller_stein.png'
import spiller_saks from './images/spiller_saks.png'
import maskin_papir from './images/maskin_papir.png'
import maskin_stein from './images/maskin_stein.png'
import maskin_saks from './images/maskin_saks.png'
import { useState } from 'react';
function App() {
  let randomNumber = 4
  const [playerChoice, setPlayerChoice] = useState({id: null, image: ukjent})
  const [machineChoice, setMachineChoice] = useState(ukjent)
  const [winner, setWinner] = useState('Ukjent')
  const [playerScore, setPlayerScore] = useState(0)
  const [machineScore, setMachineScore] = useState(0)

  function Stein() {
    setPlayerChoice({id: 0, image: spiller_stein})
    Spill()
  }
  function Saks() {
    setPlayerChoice({id: 1, image: spiller_saks})
    Spill()
  }
  function Papir() {
    setPlayerChoice({id: 2, image: spiller_papir})
    Spill()
  }
  function Spill() {
    let myArray = [maskin_stein, maskin_saks, maskin_papir]

    randomNumber = Math.floor(Math.random() * 3)
    
    let machineChoice_temp = myArray[randomNumber];
    
    console.log(randomNumber)
    
    console.log(machineChoice_temp)

    setMachineChoice(machineChoice_temp)

    if (playerChoice.id == randomNumber) {
      setWinner('Uavgjort')
    } else if (playerChoice.id == 0 && randomNumber == 1) {
      setWinner('Player wins')
      setPlayerScore(playerScore + 1)
    } else if (playerChoice.id == 0 && randomNumber == 2) {
      setWinner('Machine wins')
      setMachineScore(machineScore + 1)
    } else if (playerChoice.id == 1 && randomNumber == 2) {
      setWinner('Player wins')
      setPlayerScore(playerScore + 1)
    } else if (playerChoice.id == 1 && randomNumber == 0) {
      setWinner('Machine wins') 
      setMachineScore(machineScore + 1)
    } else if (playerChoice.id == 2 && randomNumber == 1) {
      setWinner('Machine wins')
      setMachineScore(machineScore + 1)
    } else {
      console.log("Error")
    }
  }

  function checkPlay() {

  }

  return (

    <div className='container'>
    <div className='top'>
    <div className='player'> 

      <img src={playerChoice.image} alt='spiller ukjent'/>

    </div>

    <div className='results'>
      <h2>{playerScore} </h2>
      <h2>{winner}</h2>
      <h2>{machineScore}</h2>
    </div>

    <div className='machine'>

      <img src={machineChoice} alt='spiller ukjent'/>
    
    </div>
    </div>
    

    <div className='bottom'>
  
    <button className='SSP-Button' onClick={Stein}>Stein</button>
    <button className='SSP-Button' onClick={Saks}>Saks</button>
    <button className='SSP-Button' onClick={Papir}>Papir</button>

    </div>



    </div>
  );
}

export default App;
