const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const fs = require('node:fs/promises');
const { copyFileSync } = require("node:fs");

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'ball-il',
  host: 'localhost',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);
connection.connect();

const handleAuthentication = async (req, res, next) => {
  const { brukerNavn, passord } = req.body;
  const authenticateResult = await authenticate(brukerNavn, passord);
  req.authenticateResult = authenticateResult;
  next();
};

app.post("/api/getTournaments", async (req, res) => {
  try {

      // Continue with the getTournaments logic here
      connection.query('SELECT * FROM turneringer', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      });
     
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/addUser", handleAuthentication, async (req, res) => {
  if (req.authenticateResult === "authenticated") {
    const { brukerNavn, forNavn, etterNavn, passord, sport, tlf, foresatteTlf } = req.body.userFormData;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passord, salt);
    const query = 'INSERT INTO brukere (brukerNavn, forNavn, etterNavn, passord, sport, tlf, foresatteTlf) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [brukerNavn, forNavn, etterNavn, hash, sport, tlf, foresatteTlf];
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  } else {
    res.json("Feil brukernavn eller passord");
  }
});

app.post("/api/addTournament", handleAuthentication, async (req, res) => {
  const { brukerNavn, passord, tournamentFormData } = req.body;
  const authenticateResult = await authenticate(brukerNavn, passord);

  if (authenticateResult === "authenticated") {
    const { turneringsNavn, turneringsDato, turneringsAdresse, turneringsSport, turneringsBilde } = tournamentFormData;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passord, salt);
    const query = 'INSERT INTO turneringer (turneringsNavn, turneringsDato, turneringsAdresse, turneringsSport, turneringsBilde) VALUES (?, ?, ?, ?, ?)';
    const values = [turneringsNavn, turneringsDato, turneringsAdresse, turneringsSport, turneringsBilde];
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  } else {
    res.json("Feil brukernavn eller passord");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let userCredentials = req.body;
    let brukerNavn = userCredentials.brukerNavn;
    let passord = userCredentials.passord;
    let query = 'SELECT passord FROM brukere WHERE brukerNavn = ?';
    let values = [brukerNavn];
    connection.query(query, values, async function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        res.send(JSON.stringify("Feil brukernavn eller passord"));
        return;
      }
      const match = await bcrypt.compare(passord, results[0].passord);
      if (match) {
        let response = {
          message: "Logget inn",
          brukerNavn: brukerNavn,
          passord: passord
        };
        res.send(JSON.stringify(response));
      } else {
        res.send(JSON.stringify("Feil brukernavn eller passord"));
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/nyeBrukere", async (req, res) => {
  const brukerPreParse = await fs.readFile("./brukere.json");
  const bruker = JSON.parse(brukerPreParse);

  const values = [];
  const placeholders = [];

  for (let i = 0; i < bruker.length; i++) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(bruker[i].passord, salt);
    values.push(bruker[i].brukerNavn, bruker[i].forNavn, bruker[i].etterNavn, hash, bruker[i].sport, bruker[i].tlf, bruker[i].foresatteTlf);
    placeholders.push("(?, ?, ?, ?, ?, ?, ?)");
  }

  const query = `INSERT INTO brukere (brukerNavn, forNavn, etterNavn, passord, sport, tlf, foresatteTlf) VALUES ${placeholders.join(", ")}`;

  connection.query(query, values, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.send(JSON.stringify(results));
  });
});

app.post("/api/isUserAdmin", async (req, res) => {
  const brukerNavn = req.body.brukerNavn;
  const passord = req.body.passord;

  const authenticateResult = await authenticate(brukerNavn, passord);
  if (authenticateResult == "authenticated") {
    let query = 'SELECT rolle FROM brukere WHERE brukerNavn = ?';
    let values = [brukerNavn];
    connection.query(query, values, async function (error, results, fields) {
      if (results[0].rolle == 2) {
        res.send(JSON.stringify("true"));
      } else {
        res.send(JSON.stringify("false"));
      }
    })
  } else {
    res.send(JSON.stringify("Feil brukernavn eller passord"));
  }
});

function authenticate(brukerNavn, passord) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT passord FROM brukere WHERE brukerNavn = ?';
    const values = [brukerNavn];
    connection.query(query, values, async (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve("Feil brukernavn eller passord");
        return;
      }
      const match = await bcrypt.compare(passord, results[0].passord);
      if (match) {
        resolve("authenticated");
      } else {
        resolve("Feil brukernavn eller passord");
      }
    });
  });
}
app.listen(8081, () => console.log("Server started on port 8081"));

