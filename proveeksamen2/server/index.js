const express = require("express");
const cors = require("cors");
const app = express();
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
app.use(express.json());
app.use(cors());
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const { type } = require("@testing-library/user-event/dist/type");
const { json } = require("react-router-dom");
const varer = require("./varer.json")
// const replacementMap = require("./replacement.json");
// const { register } = require("module");
// const { selectClasses } = require("@mui/material");
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));

const dbConfig = {
    user: 'root',
    password: 'root',
    database: 'kantinedatabase',
    host: 'localhost',
    port: 3306,
    // waitForConnections: true,
    connectionLimit: 100,
    // queueLimit: 0
  };

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

app.get("/getMerchandise", async (req, res) => {
  try {
    console.log("GET MERCHANDISE");
    let sql = 'SELECT * FROM meny WHERE antall > 0';
    let [result] = await req.dbConnection.query(sql);
    console.log("Selected");
    res.json(result); // Send as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

  app.post('/handlekurv', async (req, res) => {
    const b = req.body;
    const data = b.data;
  
    if (!Array.isArray(data)) {
      return res.status(400).send('Invalid data format: Expected an array');
    }
  
    const arrayOfDifferentNumbers = [];
    for (let i = 0; i < data.length; i++) {
      if (i > 0 && data[i] === data[i - 1]) continue;
      arrayOfDifferentNumbers.push(parseInt(data[i]));
    }
    
    console.log("Data:", data);
    console.log("Array of different numbers:", arrayOfDifferentNumbers);
  
    let sql = 'SELECT * FROM meny';
    let [result] = await req.dbConnection.query(sql);
  
    let result2array = [];
    for (let i = 0; i < arrayOfDifferentNumbers.length; i++) {
      sql = `SELECT * FROM meny WHERE produktID = ${arrayOfDifferentNumbers[i]}`;
      const [result2] = await req.dbConnection.query(sql);
      result2array.push(result2[0]);
    }
  
    if (result2array.length > 0) {
      console.log(result2array);
      res.send(result2array);
      console.log("Sent");
    } else {
      res.send("No products found");
    }
  });
  
  app.post('/betal', async (req, res) => {
    try {
      const b = req.body;
      const data = b.data;
      const produkter = JSON.stringify(data);
      const tlf = b.tlf;
      const dato = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formattedDate = dato.toLocaleString('en-GB', options).replace(',', '');
  
      const pris = b.pris;  // Ensure pris is defined here
      console.log(typeof(data));
      console.log("betal");
      console.log(data);
  
      let bestillingsQuery = `INSERT INTO bestillinger (bestilteProdukter, dato, pris, tlfNummer) VALUES (?, ?, ?, ?)`;
      const [result] = await req.dbConnection.query(bestillingsQuery, [produkter, formattedDate, pris, tlf]);
      console.log(result);
  
      let nummerSjekkQuery = `SELECT MAX(bestillingsID) AS maxID FROM bestillinger`;
      const [rows] = await req.dbConnection.query(nummerSjekkQuery);
      const bestillingsID = rows[0].maxID;
      console.log(bestillingsID);

      for (let i = 0; i < data.length; i++) {
        let sql = `UPDATE meny SET antall = antall - 1 WHERE produktID = ${data[i]}`;
        await req.dbConnection.query(sql);
        console.log("Kjørt")
      }

      res.json({ bestillingsID, pris, data });  // Use res.json to send multiple values as an object
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post("/nyeVarer", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let saltQuery = 'SELECT salt FROM brukere WHERE brukernavn = ?';
    let saltValues = [req.body.username];
    console.log('Executing query:', saltQuery, saltValues);
    let [saltResult] = await req.dbConnection.query(saltQuery, saltValues);
    console.log('Salt retrieved:', saltResult);
    let salt = saltResult[0].salt
    let fornavn = saltResult[0].Fornavn
    let menneskeID = saltResult[0].MenneskeID
    const finalHashedPassword = await hashPassword(password, salt)

    const passCheckQuery = 'SELECT brukernavn FROM brukere WHERE brukernavn = ? AND passord = ?';
    const passCheckValues = [username, finalHashedPassword];
    let [passCheckResult] = await req.dbConnection.query(passCheckQuery, passCheckValues);

    if (passCheckResult[0].brukernavn) {
        let lengde = Object.keys(varer.Varer).length;
        for (let i = 0; i < lengde; i++) {
            console.log(i)
            let index = 1
            let name = "vare"+[i]
            console.log("name:", name)
            console.log(varer.Varer[name])
            // const jsonArray = Array.from(varer.Varer);
            // console.log(jsonArray.name)
            // console.log(jsonArray.vare[i])
            // console.log(varer.Varer.vare1.pris)
            // console.log(varer.Varer.vare[i])
        let produktnavn = varer.Varer[name].produktNavn
        let pris = varer.Varer[name].pris
        let antall = varer.Varer[name].antall
        let bildeBane = varer.Varer[name].antall
        const vareQuery = `INSERT INTO meny (produktNavn, pris, antall, bildeBane) VALUES (?, ?, ?, ?)`;
        const vareValues = [produktnavn, pris, antall, bildeBane]
        await req.dbConnection.query(vareQuery, vareValues)
        }

        res.send("Varer lagt til")
        // console.log("kjører")
        // const vareQuery = `INSERT INTO meny (produktNavn, pris, antall, bildeBane) VALUES (?, ?, ?, ?)`;
        // const vareValues = [varer.Varer.vare1.produktNavn, varer.Varer.vare1.pris, varer.Varer.vare1.antall, varer.Varer.vare1.bildeBane]
        // let [result] = await req.dbConnection.query(vareQuery, vareValues)
        // console.log("kjørt")
        // console.log(result)
        // res.send(result)
    } else {
        res.status(418)
    }
  });
  

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
  
