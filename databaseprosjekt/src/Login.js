import { useState } from 'react';
import axios from 'axios';
import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
function Login(){
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
  const { Firstname, setFirstname } = useContext(FirstnameContext);

  // const serverTest = () => {
  //   axios.get('http://localhost:4000/test')
  //   .then((response) => {
  //     console.log(response.data)
  //   })

  // }
  const [username, setUsername] = useState("")
  const [encryptedPassword, setEncryptedPassword] = useState("")
  const [unencryptedPassword, setUnencryptedPassword] = useState("")
  const [status, setStatus] = useState("Login")

  function encrypt(event) {

    event.preventDefault()
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    setUsername(username)
    setFirstname(username);
    setUnencryptedPassword(password)
    axios.post('/login', {"password":password, "username":username})
      .then(response => {
        if (response.data[0] === "Feil brukernavn eller passord") {
          alert(response.data);
          setEncryptedPassword("")
          setUnencryptedPassword("")
          setUsername("")
        } else {


          console.log("response.data: " + response.data)

          setStatus("Logget inn, omdirrigerer til hovedsiden");
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("isLoggedIn", true)
          sessionStorage.setItem("menneskeID", response.data.menneskeID)
          sessionStorage.setItem("rolleID", response.data.rolleID)
          console.log(sessionStorage)
          setIsLoggedIn(true);
          
          // setUsername(response.data.username)
        }
      })
      .catch(error => {
        console.error('Error sending the POST request:', error);
      });

    }


  // function encrypt (event) {
  //   let password = document.querySelector("#password").value;
  //   axios.post('/test', {"password":password})
  //   .then(response => {
  //     console.log(response.data)
  //   })
  // }
    // document.getElementById("unencryptedPassword").innerHTML = "U-kryptert passord: " + text;
    // document.getElementById("encryptedPassword").innerHTML = "Kryptert passord: " + myArray.join("");
  

  // document.querySelector('.formDiv').addEventListener('submit', encrypt);

  // serverTest()
  return (
    <div>

    {isLoggedIn ? <Navigate to="/"/> : null}

    <form className="formDiv" onSubmit={encrypt}>
        <label className="headerText">{status}</label>
        <label>Username:</label>
        <input type="text" className='passwordInput' id='username'/>
        <label>Password:</label>
        <input type="password" className="passwordInput" id='password'/>
        <input type="submit" value="Login" className='loginButton'/>
    </form>

    </div>
  );
}

export default Login;