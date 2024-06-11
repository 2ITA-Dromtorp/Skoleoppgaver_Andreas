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
    let epost = userCredentials.epost;
    let passord = userCredentials.passord;
    let tlf = userCredentials.tlf;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passord, salt);
    let query = 'INSERT INTO brukere (epost, passord, tlf) VALUES (?, ?, ?)';
    let values = [epost, hash, tlf];
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
    let epost = userCredentials.epost;
    let passord = userCredentials.passord;
    let query = 'SELECT passord FROM brukere WHERE epost = ?';
    let values = [epost];
    connection.query(query, values, async function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      console.log(results[0].passord)
      const match = await bcrypt.compare(passord, results[0].passord);
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

app.post("/api/submitTicket", async (req, res) => {
  try {
    let ticketInfo = req.body;
    let brukerID = 1;
    let emne = ticketInfo.emne;
    let beskrivelse = ticketInfo.beskrivelse;

    let query = 'INSERT INTO tickets (brukerID, emne, beskrivelse) VALUES (?, ?, ?)';
    let values = [brukerID, emne, beskrivelse];
    connection.query(query, values, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
});

app.listen(8081, () => console.log("Server started on port 8081"));

