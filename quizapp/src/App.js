import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';
import { waitFor } from '@testing-library/react';
// import quiz from '../server/quiz.json'
function App() {



  const [answerNum, setAnswerNum] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  let [questionNumString, setQuestionNumString] = useState(1);
  const [customersData, setCustomersData] = useState({});
  const [renders, setRenders] = useState(null);
  const [test, setTest] = useState("");
  const [tester, setTester] = useState(" ");
  useEffect(() => {
      getCustomersData();
  }, []);
  const getCustomersData = async () => {
    await axios
      .get("/select")
      .then(response => {
        setCustomersData(response.data);
        console.log(response.data)
      })
      .catch(error => console.log(error));
  };
  // getCustomersData();
  
  const button1 = () => {
  setAnswerNum(1)
  setTest(" red")
  getTester();
  // handleSubmit()
};

const getTester = async () => {
  await axios
    .get("/red")
    .then(response => {
      setTester(response.data);
      console.log(response.data)
    })
    .catch(error => console.log(error));
};


const button2 = () => {
  setAnswerNum(2)
  // handleSubmit()
};
const button3 = () => {
  setAnswerNum(3)
  // handleSubmit()
};
const button4 = () => {
  setAnswerNum(4)
  // handleSubmit()
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
      questionNumString = questionNum.toString();
      console.log(questionNumString)
    } else {
      console.log("feil!")
    }
  }

  useEffect(() => {
    // start()
    console.log("afipfjaoifjapågji")
  }, [renders]);
  // const start = () => {
  //   console.log("start!")
  //   console.log(renders)

  useEffect(()=>{
    console.log(customersData)
    console.log(Boolean(customersData))
    console.log("customersData er satt")
    
  },[customersData])
    return (
      <div className="quizWrapper">
        <div className='quizForm'>
          <form onSubmit={handleSubmit}>
          <h1>Spørsmål {questionNum}:</h1>
          {customersData.quiz &&  <h2>{customersData.quiz.questions[`question${questionNum}`]}</h2> }
          {customersData.quiz && <button className={['submitButton' + tester]} onClick={button1}>{customersData.quiz.answertext[`question${questionNum}`]}</button>}
          {customersData.quiz && <button className={['submitButton' + tester]} onClick={button2}>{customersData.quiz.answertext[`question${questionNum}`]}</button>}
          {customersData.quiz && <button className={['submitButton' + tester]} onClick={button3}>{customersData.quiz.answertext[`question${questionNum}`]}</button>}
          {customersData.quiz && <button className={['submitButton' + tester]} onClick={button4}>{customersData.quiz.answertext.question4}</button>}
          <h2>Valgt svar: {answerNum}</h2>
          </form>
        </div>
    
      </div>
      );
  // }

  // return (
  //   <>    {renders}
  //   <button onClick={(() => setRenders(start()))}>Start</button>
  //   </>

  // )

}

export default App;


