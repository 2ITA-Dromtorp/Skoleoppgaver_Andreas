import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {


  const [answerNum, setAnswerNum] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);

  const button1 = () => {
  setAnswerNum(1)
};
const button2 = () => {
  setAnswerNum(2)
};
const button3 = () => {
  setAnswerNum(3)
};
const button4 = () => {
  setAnswerNum(4)
};

useEffect(()=>{
  
  console.log(answerNum)

}, [answerNum])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Denne funksjonen gjør noe!")
    if (answerNum === 3) {
      console.log("riktig!")
      setQuestionNum(questionNum + 1)
    } else {
      console.log("feil!")
    }
  }


  return (
  <div className="quizWrapper">
    <div className='quizForm'>
      <form onSubmit={handleSubmit}>
      <h1>Spørsmål {questionNum}:</h1>
      <h2>Hva er usestate?</h2>
      <button className='submitButton' onClick={button1}>Kult</button>
      <button className='submitButton' onClick={button2}>Ikke kult</button>
      <button className='submitButton' onClick={button3}>Tortur</button>
      <button className='submitButton' onClick={button4}>En greie</button>
      <h2>Valgt svar: {answerNum}</h2>
      </form>
    </div>
  </div>
  );
}

export default App;
