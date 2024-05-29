const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const varer = require("./varer.json")
const port = process.env.PORT || 8081;
const fs = require('node:fs/promises');
const { copyFileSync } = require("node:fs");
app.listen(port, () => console.log(`Server started on port ${port}`));


const dbConfig = {
    user: 'root',
    password: 'root',
    database: 'kantinedatabase',
    host: 'localhost',
    port: 3306,
    connectionLimit: 100,
    multipleStatements: true,
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
    let sql = 'SELECT * FROM meny WHERE antall > 0';
    let [result] = await req.dbConnection.query(sql);
    res.json(result); // Send as JSON
  } catch (err) {
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
  
    let sql = 'SELECT * FROM meny';
    let [result] = await req.dbConnection.query(sql);
  
    let result2array = [];
    for (let i = 0; i < arrayOfDifferentNumbers.length; i++) {
      sql = `SELECT * FROM meny WHERE produktID = ${arrayOfDifferentNumbers[i]}`;
      const [result2] = await req.dbConnection.query(sql);
      result2array.push(result2[0]);
    }
  
    if (result2array.length > 0) {
      res.send(result2array);
    } else {
      res.send("Ingen produkter i kurven");
    }
  });
  
  app.post('/betal', async (req, res) => {
    try {
      const b = req.body;
      const data = b.data;
      const produkter = JSON.stringify(data);
      const tlf = b.tlf;
      const pris = b.pris;  // Ensure pris is defined here
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
      
      if (pris > 0) {

  
      let bestillingsQuery = `INSERT INTO bestillinger (bestilteProdukter, dato, pris, tlfNummer) VALUES (?, ?, ?, ?)`;
      const [result] = await req.dbConnection.query(bestillingsQuery, [produkter, formattedDate, pris, tlf]);

  
      let nummerSjekkQuery = `SELECT MAX(bestillingsID) AS maxID FROM bestillinger`;
      const [rows] = await req.dbConnection.query(nummerSjekkQuery);
      const bestillingsID = rows[0].maxID;

      for (let i = 0; i < data.length; i++) {
        let sql = `UPDATE meny SET antall = antall - 1 WHERE produktID = ${data[i]}`;
        await req.dbConnection.query(sql);
      }

      res.json({ bestillingsID, pris, data });  // Use res.json to send multiple values as an object
    } else {
        res.send("Legg til varer i kurven")
    }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.post("/nyeVarer", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let saltQuery = 'SELECT salt FROM brukere WHERE brukernavn = ?';
    let saltValues = [req.body.username];
    let [saltResult] = await req.dbConnection.query(saltQuery, saltValues);
    let salt = saltResult[0].salt
    let fornavn = saltResult[0].Fornavn
    let menneskeID = saltResult[0].MenneskeID
    const finalHashedPassword = await hashPassword(password, salt)

    const passCheckQuery = 'SELECT brukernavn FROM brukere WHERE brukernavn = ? AND passord = ?';
    const passCheckValues = [username, finalHashedPassword];
    let [passCheckResult] = await req.dbConnection.query(passCheckQuery, passCheckValues);

    if (passCheckResult[0].brukernavn){
        const varePreParse = await fs.readFile("./varer.json")
        const vare = JSON.parse(varePreParse)

        let vareQuery = "";
        let vareValues = [];
        for (let i = 0; i < vare.length; i++) {
            console.log(vare[i])
            vareQuery += "INSERT INTO meny (produktNavn, pris, antall, bildeBane) VALUES (?, ?, ?, ?); ";
            vareValues.push(vare[i].produktNavn, vare[i].pris, vare[i].antall, vare[i].bildeBane)
        
        }
        console.log("Query", vareQuery)
        console.log("Values",vareValues)
        const [result] = await req.dbConnection.query(vareQuery, vareValues, (err, res)=> { 
        if(err) {
            console.log(err)
            return express.response.sendStatus(500)
        } 
        response.sendStatus(200)
    }
    )
        res.send("Varer lagt til")
    }else {
        res.status(418)
    }
  });
  

  async function hashPassword(password, salt) {

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
    return finalHashedPassword;
  }
  
