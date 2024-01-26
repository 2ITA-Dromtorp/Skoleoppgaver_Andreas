import logo from './logo.svg';
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailContext } from './context';
// import { useNavigate } from "react-router-dom";
import { IsLoggedInContext } from './context'

function App() {

  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);



  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email, password);
      login();
      console.log(EmailContext)
      console.log(isLoggedIn)
      console.log(IsLoggedInContext)
      // navigate("/");
  };

  const login = () => {
      const dataToSend = {
          email: email,
          password: password,
      }
  
      fetch('/login', {
          method:'POST',
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify(dataToSend),
      })
      .then(async (res) => {
          const data = await res.json();
          if (res.status===200) {
              console.log("NEIENEIPEJEEIO")
              // setIsLoggedIn(true);
              // setFirstname(data[0].Fornavn);
              // setLastName(data[0].Etternavn);
          } else {
              // Display error message or handle unsuccessful login
          }
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
      });
      
  };
  
  useEffect(()=>{
      console.log("MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      if(email!=='') {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('isLoggedIn', isLoggedIn);
          console.log(localStorage);
      }
      
  }, [email, password])

  const handleRegisterClick = () => {
    console.log("registrert");
    if(email!=='') {
     if (email=="a") {
        console.log("registrert")
     }
    }
  }
  
  

  // if (isLoggedIn === true) {
  //     return (
  //         <main>
  //             <p>LOGGED IN! {localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</p>
  //         </main>
  //     )

  return (
    <main>
    <div className='loginForm'>
        <form onSubmit={handleSubmit}>
            <div className='loginDiv'>
                <div className='logintextDiv'>
                    <label htmlFor="email">E-Post:</label>
                </div>
                <div className='labelDiv'>
                    <input
                        className='textInput'
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='loginDiv'>
                <div className='logintextDiv'>
                    <label htmlFor="password">Passord:</label>
                </div>
                <div className='labelDiv'>
                    <input
                        className='textInput'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='spaceDiv'></div>
            <div className='submitDiv'>
                <input className='submitButton' type="submit" value="Logg inn" />
            </div>
            <div className='noAccountDiv'>
            <button className='noAccountButton' onClick={handleRegisterClick}>Har du ikke konto? Registrer deg!</button>
            </div>
        </form>
    </div>

      

</main>
  );
  }




export default App;