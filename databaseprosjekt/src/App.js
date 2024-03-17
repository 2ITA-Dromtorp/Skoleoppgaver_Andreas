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

  const [encryptedPassword, setEncryptedPassword] = useState("")
  const [unencryptedPassword, setUnencryptedPassword] = useState("")

  function encrypt(event) {
    event.preventDefault()
    let text = document.querySelector(".passwordInput").value;
    console.log(text)
    console.log("fesdio")
    setUnencryptedPassword(text)
    axios.post('/test', {"text":text})
      .then(response => {
        if (response.data === "Do not include spaces") {
          alert(response.data);
          setEncryptedPassword("")
          setUnencryptedPassword("")
        } else if (response.data === "DO NOT USE SPECIAL CHARACTERS EXCEPT FOR ! AND ?. ONLY USE LETTERS IN THE ENGLISH ALPHABET") {
          alert(response.data);
          setEncryptedPassword("")
          setUnencryptedPassword("")
        } else {
          setEncryptedPassword(response.data)
          console.log(encryptedPassword)
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
        <div class="navDiv"><a href="https://vg.no">Obligatory Navbarbutton </a></div>
        <div class="navDiv"><a href="https://vg.no">Obligatory Navbarbutton </a></div>
    </nav>
</header>

<body>
    <form class="formDiv" onSubmit={encrypt}>
        <label class="headerText">Login</label>
        <label>Password:</label>
        <input type="password" class="passwordInput"/>
        <p class="passWord" id="unencryptedPassword">Unencrypted password: {unencryptedPassword}</p>
        <p class="passWord" id="encryptedPassword">Encrypted password: {encryptedPassword}</p>
    </form>
</body>
    </div>
  );
}

export default App;
