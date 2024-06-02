import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [collatz, setCollatz] = useState(null);
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setCollatz(Number(inputValue));
    checkOddOrEven(Number(inputValue));
  }

  function checkOddOrEven(collatz) {
    if (collatz < 3) {
      console.log('Ferdig');
      // alert('Ferdig');
      setCollatz("Ferdig");
    } else if (collatz % 2 === 1) {
      setCollatz(collatz * 3 + 1);
      console.log(collatz);
      checkOddOrEven(collatz * 3 + 1);
    } else {
      setCollatz(collatz / 2);
      console.log(collatz);
      checkOddOrEven(collatz / 2);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{collatz}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;