const express = require("express");
const cors = require("cors");
const app = express();
const alphabet = require("./alphabet.json");
app.use(express.json());
app.use(cors());    
const replacementMap = require("./replacement.json")  
console.log(replacementMap)
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
console.log(alphabet.alphabet[0])
app.post("/test", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  // Generate a random salt
  const salt = generateSalt();
  // const salt = "sfoiefh"

  // Concatenate the password and salt
  const saltedPassword = password + salt;

  let hash = 0;

  for (let i = 0; i < saltedPassword.length; i++) {
    hash = (hash << 5) - hash + saltedPassword.charCodeAt(i);
  }

  const hashedPassword = hash.toString();

  // Concatenate the hashed password and the salt
  const combinedHash = hashedPassword + salt;

  // Hash the combined string again
  let finalHash = 0;

  for (let i = 0; i < combinedHash.length; i++) {
    finalHash = (finalHash << 5) - finalHash + combinedHash.charCodeAt(i);
  }

  const finalHashedPassword = finalHash.toString();

  res.send(finalHashedPassword);
});

function generateSalt() {
  const min = 33;
  const max = 126;

  const salt = Array.from({ length: 10 }, () =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)
  ).join('');

  return salt;
}
