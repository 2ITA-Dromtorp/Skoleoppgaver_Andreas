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


  function encrypt(event) {

    event.preventDefault()
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    setUsername(username)
    setFirstname(username);
    setUnencryptedPassword(password)
    axios.post('/test', {"password":password, "username":username})
      .then(response => {
        if (response.data === "Do not include spaces") {
          alert(response.data);
          setEncryptedPassword("")
          setUnencryptedPassword("")
          setUsername("")
        } else if (response.data === "DO NOT USE SPECIAL CHARACTERS EXCEPT FOR ! AND ?. ONLY USE LETTERS IN THE ENGLISH ALPHABET") {
          alert(response.data);
          setEncryptedPassword("")
          setUnencryptedPassword("")
          setUsername("")
        } else {


          setEncryptedPassword(response.data)
          setIsLoggedIn(true);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("isLoggedIn", true)
          console.log(sessionStorage)
          
          // setUsername(response.data.username)
        }
      })
      .catch(error => {
        console.error('Error sending the POST request:', error);
      });

    }

    // document.getElementById("unencryptedPassword").innerHTML = "U-kryptert passord: " + text;
    // document.getElementById("encryptedPassword").innerHTML = "Kryptert passord: " + myArray.join("");
  

  // document.querySelector('.formDiv').addEventListener('submit', encrypt);

  // serverTest()
  return (
    <div>

    {isLoggedIn ? <Navigate to="/"/> : null}

    <form className="formDiv" onSubmit={encrypt}>
        <label className="headerText">Login</label>
        <label>Username:</label>
        <input type="text" className='passwordInput' id='username'/>
        <label>Password:</label>
        <input type="password" className="passwordInput" id='password'/>
        <p className='passWord' id='username'>Username: {username}</p>
        <p className="passWord" id="unencryptedPassword">Unencrypted password: {unencryptedPassword}</p>
        <p className="passWord" id="encryptedPassword">Encrypted password: {encryptedPassword}</p>
        <input type="submit" value="Login" className='loginButton'/>
    </form>

    </div>
  );
}

export default Login;