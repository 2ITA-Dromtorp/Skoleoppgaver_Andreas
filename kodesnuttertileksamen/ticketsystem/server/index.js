const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'ticketsystem',
  host: 'localhost',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);
connection.connect();

app.get("/api/getMerchandise", async (req, res) => {
  connection.query('SELECT * FROM brukere', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

app.post("/api/register", async (req, res) => {
  try {
    let userCredentials = req.body;
    let fornavn = userCredentials.fornavn;
    let etternavn = userCredentials.etternavn;
    let epost = userCredentials.epost;
    let username = userCredentials.username;
    let password = userCredentials.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let query = 'INSERT INTO brukere (fornavn, etternavn, epost, username, password) VALUES (?, ?, ?, ?, ?)';
    let values = [fornavn, etternavn, epost, username, hash];
    connection.query(query, values, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let userCredentials = req.body;
    let username = userCredentials.username;
    let password = userCredentials.password;
    let query = 'SELECT password FROM brukere WHERE username = ?';
    let values = [username];
    connection.query(query, values, async function (error, results, fields) {
      if (error) throw error;
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        res.send(JSON.stringify("Logget inn"));
      } else {
        res.send(JSON.stringify("Feil brukernavn eller passord"));
      }
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
});

app.listen(8081, () => console.log("Server started on port 8081"));