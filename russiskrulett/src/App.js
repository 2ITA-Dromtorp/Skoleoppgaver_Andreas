import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BulletAmountContext, BulletAmountProvider } from "./context";


function App() {

  const [bulletAmount, setBulletAmount] = useState("");


  return (
    <div className="App">
      <h1>Russisk rulett!</h1>

      <Link to={`/game`}>
      <button onClick={console.log(BulletAmountContext)}>Start</button>
      </Link>
    </div>
  );
}

export default App;
