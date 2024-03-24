const express = require("express");
const cors = require("cors");
const app = express();
const alphabet = require("./alphabet.json");
app.use(express.json());
app.use(cors());    
const replacementMap = require("./replacement.json")  
console.log(replacementMap)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
console.log(alphabet.alphabet[0])
app.post("/test", (req, res) => {
  password = req.body.password
  username = req.body.username
    let myArray = password.split("");
    let test = 1
    // console.log(replacementMap)
    let number = test << 5 - test
    console.log(number)
    console.log(myArray[3])
    // console.log(replacementMap)
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] !== " ") {
        const replacement = replacementMap.replacementMap[myArray[i]];

        // console.log(String.fromCharCode(superstring))
        if (replacement) {
          myArray[i] = myArray[i].charCodeAt(0).toString(2);

        } 
        
      } else {
        res.send("Do not include spaces");
        return; // Stop encryption process if a space is found
      }
    }
    // let salt = Math.round(username.length + password.length / 4)
    // myArray = myArray.concat(salt)
    let min = 33
    let max = 126
    let num = Math.floor(Math.random() * (max - min + 1) ) + min;
    console.log(num)
    let salt = String.fromCharCode(Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min, Math.floor(Math.random() * (max - min + 1) ) + min ) 
    console.log(salt)
    let finishedPassword = salt + myArray;
    let final = myArray;
    // console.log(final)
    let finnum = final << 3
    console.log(finnum)
    // let superstring = finishedPassword.charCodeAt(0).toString(2);
    // console.log(superstring)
    console.log(finishedPassword)
    res.send(finishedPassword);
})

