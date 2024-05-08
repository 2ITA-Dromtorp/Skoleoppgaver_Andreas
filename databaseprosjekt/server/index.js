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
const { selectClasses } = require("@mui/material");
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

app.get("/getEquipment", async (req, res) => {
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

app.get("/getRequests", async (req, res) => {
  try {
    console.log("GET REQUESTS")
    let sql = 'SELECT * FROM utlan';
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

app.get("/getStudents", async (req, res) => {
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


app.post("/login", async (req, res) => {
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

    query = 'SELECT menneskeID, rolleID FROM `elev` WHERE brukernavn = ? AND passord = ?';
    values = [req.body.username, finalHashedPassword];
    [result] = await req.dbConnection.query(query, values);
    if (result && result.length > 0) {
      console.log(result)
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
  } catch (err) {
    console.log(err)
    res.send("Feil brukernavn eller passord");
  } finally {
    req.dbConnection.release();
  }


});

app.post("/logintest", async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const query = 'UPDATE elev SET passord = ? WHERE brukernavn = ?';
    const values = [hash, username];
    const [result] = await req.dbConnection.query(query, values);
    console.log(hash, username)
    // return hash;
    if (err) {
      console.log(err);
    };
  });
});


app.post("/laan", async (req, res) => {
  const bookedEquipment = req.body.bookedEquipment;
  const laaner = req.body.menneskeID;
  const dato = new Date()
  const query = 'INSERT INTO utlan (Utstyrstype, elevID, Dato, Status) VALUES (?, ?, ?, ?)';
  const values = [bookedEquipment, laaner, dato, "Venter"];
  const [result] = await req.dbConnection.query(query, values);
  console.log('Result:', result);
  res.send("Forespørsel sendt");
})

app.post("/approveReq", async (req, res) => {
const username = req.body.username;
const password = req.body.password;
const acceptedRequest = req.body.acceptedRequest
const elevID = req.body.elevID
console.log(req.body)
console.log("TEST",elevID)
let saltQuery = 'SELECT salt, Fornavn, MenneskeID FROM elev WHERE brukernavn = ?';
let saltValues = [req.body.username];
console.log('Executing query:', saltQuery, saltValues);
let [saltResult] = await req.dbConnection.query(saltQuery, saltValues);
console.log('Salt retrieved:', saltResult);
let salt = saltResult[0].salt
let fornavn = saltResult[0].Fornavn
let menneskeID = saltResult[0].MenneskeID
const finalHashedPassword = await hashPassword(password, salt)

const passCheckQuery = 'SELECT rolleID FROM elev WHERE brukernavn = ? AND passord = ?';
const passCheckValues = [req.body.username, finalHashedPassword];
console.log('Executing query:', passCheckQuery, passCheckValues);
let [passCheckResult] = await req.dbConnection.query(passCheckQuery, passCheckValues);
console.log(passCheckResult[0].rolleID)
if (passCheckResult[0].rolleID == 1) {
  res.status(401).send("Du har ikke tilgang til denne tjenesten.");
} else {
  const acceptQuery = 'UPDATE utlan SET Status = ? WHERE utlanID = ?';
  const acceptValues = ["Godkjent", acceptedRequest];
  console.log('Executing query:', acceptQuery, acceptValues);
  let [acceptResult] = await req.dbConnection.query(acceptQuery, acceptValues);
  console.log('Result:', acceptResult);
  if (acceptResult) {
    const selectType = 'SELECT utstyrstype FROM utlan WHERE utlanID = ?';
    const selectValues = [acceptedRequest];
    const [utstyrstype] = await req.dbConnection.query(selectType, selectValues);
    console.log("Utstyrstype [0] og ikke ",utstyrstype[0].utstyrstype)
    console.log(utstyrstype)
    let utstyr = utstyrstype[0].utstyrstype
    const updateQuery = 'UPDATE utstyr SET menneskeID = ?, laaner = ? WHERE utstyrsID = ?';
    const updateValues = [menneskeID, fornavn, utstyr];
    console.log('Executing query:', updateQuery, updateValues);
    let [updateResult] = await req.dbConnection.query(updateQuery, updateValues);
    console.log('Result:', updateResult);
    res.send("Laanet er godkjent"); 
  } else {
    res.send("Feil");
  }
}
})


app.post("/innlevering", async (req, res) => {
  const menneskeID = req.body.menneskeID;
  const bookedEquipment = req.body.bookedEquipment;

  try {
    let query = 'UPDATE utstyr SET menneskeID = 0, laaner = ? WHERE utstyrsID = ?';
    let values = ["", bookedEquipment];
    console.log('Executing query:', query, values);
    let [result] = await req.dbConnection.query(query, values);
 
      const unbookedQuery = 'UPDATE utlan SET Status = ? WHERE utstyrstype = ? AND elevID = ?';
      const unbookedValues = ["Levert", bookedEquipment, menneskeID];
      console.log('Executing query:', unbookedQuery, unbookedValues);
      let [unbookedResult] = await req.dbConnection.query(unbookedQuery, unbookedValues);
      console.log('Result:', unbookedResult);
    
    console.log('Result:', result);
    res.status(200).send("Laanet er booket");
  } catch (err) {
    console.log(err);
    res.send("Noe gikk galt. Kontakt IT.");
  }

})

app.post("/register", async (req, res) => {
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
    let values = [registratorCredentials];
    console.log('Executing query:', query, values);
    let [result] = await req.dbConnection.query(query, values);


    console.log('Result1:', result);
    console.log(result)
    console.log(result[0].rolleID)
    console.log(result[0])
    if (result[0].rolleID !== 1) {

      let query = 'INSERT INTO elev (fornavn, etternavn, klasse, tlf, tlf_foresatte, rolleID, brukernavn, passord, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let values = [userCredentials.fornavn, userCredentials.etternavn, userCredentials.klasse, userCredentials.tlf, userCredentials.tlf_foresatte, userCredentials.rolleID, userCredentials.username, finalHashedPassword, salt];
      console.log('Executing query:', query, values);
      let [result] = await req.dbConnection.query(query, values);
      console.log('Result2:', result);
      res.send("Brukeren er lagret");
    } else {
      res.send("Du har ikke tilang til denne tjenesten.");
      console.log("Du har ikke tilang til denne tjenesten.")
    }


  } catch (err) {
    res.send(err)
    console.log(err)
  } finally {
    req.dbConnection.release();
  }


})


async function hashPassword(password, salt) {

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

  const salt = Array.from({
      length: 10
    }, () =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)
  ).join('');

  return salt;
}