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

    console.log(replacementMap)

    console.log(myArray[3])
    // console.log(replacementMap)
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] !== " ") {
        const replacement = replacementMap.replacementMap[myArray[i]];
        if (replacement) {
          myArray[i] = replacement + (myArray[i + 1]);
        } else {
          res.send("DO NOT USE SPECIAL CHARACTERS EXCEPT FOR ! AND ?. ONLY USE LETTERS IN THE ENGLISH ALPHABET")
          myArray = ""
        }
      } else {
        res.send("Do not include spaces");
        return; // Stop encryption process if a space is found
      }
    }
    // let salt = Math.round(username.length + password.length / 4)
    // myArray = myArray.concat(salt)
    let finishedPassword = myArray.join("");
    res.send(finishedPassword);
})