const express = require("express");
const cors = require("cors");
const app = express();
const alphabet = require("./alphabet.json");
const https = require('https');
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(express.json());
app.use(cors());    
var fs = require('fs-sync');
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const replacementMap = require("./replacement.json");  
const { register } = require("module");
console.log(replacementMap)
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));


// const httpOptions = {
//   key: fs.readFileSync('C:/Certbot/live/mulighet.no-0003/privkey.pem', 'utf8'),
//   cert: fs.readFileSync('C:/Certbot/live/mulighet.no-0003/fullchain.pem', 'utf8'),
// };

// const httpsServer = https.createServer(httpOptions, app);
// const httpServer = http.createServer(app);

// httpsServer.listen(process.env.PORT, () => {
//   console.log(`HTTPS server is running on port ${process.env.PORT}`);
// });

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'utstyrutlaandatabase',
  host: 'localhost',
  port: 3306,
  // waitForConnections: true,
  connectionLimit: 100,
  // queueLimit: 0
};
 
// Create a connection pool
const pool = mysql.createPool(dbConfig);
app.use(dbMiddleware);


async function dbMiddleware(req, res, next) {
  try {
    req.dbConnection = await pool.getConnection();
    next();
  } catch (err) {
    console.error('Failed to get a database connection!', err);
    res.status(500).send('Internal Server Error');
  }
}

app.get("/coffee", (req, res) => {
  res.status(418).send('I am a teapot');
});

app.get("/getEquipment", async(req, res) => {
  try {
    console.log("GET EQUIPMENT")
    let sql = 'SELECT * FROM utstyr';
    let [result] = await req.dbConnection.query(sql);
    // sql = 'SELECT Fornavn FROM utstyr';
    // console.log(JSON.stringify(result));
    console.log("Selected")
    res.json(result); // Send as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');

  } 
});

app.get("/getStudents", async(req, res) => {
  try {
    const sql = 'SELECT * FROM elev';
    const [result] = await req.dbConnection.query(sql);
    console.log(JSON.stringify(result));
    res.json(result); // Send as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } 
});


app.post("/test", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  // Generate a random salt
  const salt = generateSalt();

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
  console.log(salt, finalHashedPassword)
  res.send(finalHashedPassword);
});

app.post("/login", async(req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  try {
    let query = 'SELECT salt FROM elev WHERE brukernavn = ?';
    let values = [req.body.username];
    console.log('Executing query:', query, values);
    let [result] = await req.dbConnection.query(query, values);
    console.log('Salt retrieved:', result);
    let salt = result[0].salt
    
    console.log("salt = " + salt)

    const finalHashedPassword = await hashPassword(password, salt)
    console.log(finalHashedPassword)

    // const saltedPassword = password + salt;
  
    // let hash = 0;
  
    // for (let i = 0; i < saltedPassword.length; i++) {
    //   hash = (hash << 5) - hash + saltedPassword.charCodeAt(i);
    // }
    // const hashedPassword = hash.toString();
  
    // // Concatenate the hashed password and the salt
    // const combinedHash = hashedPassword + salt;
  
    // // Hash the combined string again
    // let finalHash = 0;
  
    // for (let i = 0; i < combinedHash.length; i++) {
    //   finalHash = (finalHash << 5) - finalHash + combinedHash.charCodeAt(i);
    // }
  
    // const finalHashedPassword = finalHash.toString();
    // console.log(salt, finalHashedPassword)
     query = 'SELECT menneskeID, rolleID FROM `elev` WHERE brukernavn = ? AND passord = ?';
     values = [req.body.username, finalHashedPassword];
     [result] = await req.dbConnection.query(query, values);
     if (result && result.length > 0) {
      // let manID = result[0].menneskeID + ""; // Concatenate with underscore
      // console.log("manid :" + manID);
      // res.status(200).send(manID); // Set the status code to 200 and send the manID as the response body
      res.status(200).send(result[0]);
  } else {
      res.status(401).send("Feil brukernavn eller passord"); // Set the status code to 401 for unauthorized
  }
    if (result) {
      console.log("JAAA");
    } else {
      console.log("NOO");
    }
    console.log('Result:', result[0]);
    // if (result.length > 0) {
    //   res.send(toString(result.menneskeID));
    // } else {
    //   res.send("Feil brukernavn eller passord");
    // }

  } catch (err){
    console.log(err)
    res.send("Feil brukernavn eller passord");
  } finally {
    req.dbConnection.release();
  }

  
});

app.post("/logintest", async(req, res) => {
  
  const password = req.body.password;
  const username = req.body.username;

  bcrypt.hash(password, saltRounds, async function(err, hash) {
   const query = 'UPDATE elev SET passord = ? WHERE brukernavn = ?';
   const values = [hash, username];
    const [result] = await req.dbConnection.query(query, values);
      console.log(hash, username)
    // return hash;
    if (err) {
      console.log(err);
    }
    ; });

  


    // [result] = await req.dbConnection.query(query, values);
      
    //   res.send(result, hash);
  // Store hash in your password DB.



});




app.post("/laan", async(req, res) => {
  const menneskeID = req.body.menneskeID;
  const bookedEquipment = req.body.bookedEquipment;

  try {
    let query = 'UPDATE utstyr SET menneskeID = ? WHERE utstyrsID = ?';
    let values = [menneskeID, bookedEquipment];
    console.log('Executing query:', query, values);
    let [result] = await req.dbConnection.query(query, values);
    console.log('Result:', result);
    res.send("Laanet er booket");
  } catch (err) {
    console.log(err);
    res.send("Feil");
  }

}
)

app.post("/delete", async(req, res) => {
  const menneskeID = req.body.menneskeID;
  const bookedEquipment = req.body.bookedEquipment;

  try {
    let query = 'UPDATE utstyr SET menneskeID = 0 WHERE utstyrsID = ?';
    let values = [bookedEquipment];
    console.log('Executing query:', query, values);
    let [result] = await req.dbConnection.query(query, values);
    console.log('Result:', result);
    res.send("Laanet er avbestilt");
  } catch (err) {
    console.log(err);
    res.send("Feil");
  }

}
)

app.post("/register", async(req, res) => {
  const userCredentials = req.body.userCredentials;
  const registratorCredentials = req.body.registratorCredentials;

  console.log(req.body)

  const salt = generateSalt();

  const finalHashedPassword = await hashPassword(userCredentials.password, salt)
  console.log(finalHashedPassword)

  // console.log("Registrator:" + registratorCredentials.menneskeID)
  console.log(userCredentials)
  console.log(registratorCredentials)
  try {
    
    let query = 'SELECT rolleID FROM elev WHERE menneskeID = ?';
    let values = [registratorCredentials.menneskeID];
    let [result] = await req.dbConnection.query(query, values);
    console.log('Result:', result);
    if (result > 1) {
      query = 'INSERT INTO elev (fornavn, etternavn, klasse, tlf, tlf_foresatte, rolleID, brukernavn, passord) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      values = [userCredentials.fornavn, userCredentials.etternavn, userCredentials.klasse, userCredentials.tlf, userCredentials.tlf_foresatte, userCredentials.rolleID, userCredentials.username, userCredentials.password];
      console.log('Executing query:', query, values);
      [result] = await req.dbConnection.query(query, values);
      console.log('Result:', result);
      res.send("Brukeren er lagret");
    } else {
      res.send("Du har ikke tilang til denne tjenesten.");
      console.log("Du har ikke tilang til denne tjenesten.")
    }


  } catch (err) {
    res.send(err)
    console.log(err)
  }


}
)


async function hashPassword (password, salt) {

  const saltedPassword = password + salt;

  console.log("Passordhashing:" + saltedPassword)

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
  console.log(salt, finalHashedPassword);
  return finalHashedPassword;
}

function generateSalt() {
  const min = 33;
  const max = 126;

  const salt = Array.from({ length: 10 }, () =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)
  ).join('');

  return salt;
}
