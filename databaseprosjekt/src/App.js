import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import rat from './images/logo.gif'
import { useState } from 'react';
function App() {

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
    console.log(username)
    console.log(password)
    setUsername(username)
    console.log("fesdio")
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
          console.log(encryptedPassword)
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
<header>
    <nav>
        <div class="navDiv" id="navLogoDiv"><img id="logo" src={rat}/></div>
        <div class="navDiv">Obligatory Navbarbutton</div>
        <div class="navDiv">Obligatory Navbarbutton</div>
    </nav>
</header>

<body>
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
</body>
    </div>
  );
}

export default App;
