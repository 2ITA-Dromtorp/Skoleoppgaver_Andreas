const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'ball-il',
  host: 'localhost',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);
connection.connect();

async function crypt() {
  const passord = "Skole123"
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passord, salt);
  console.log(hash)
}

crypt()

app.get("/api/getMerchandise", async (req, res) => {
  connection.query('SELECT * FROM brukere', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

app.post("/api/getTournaments", async (req, res) => {
  try {
    const brukerNavn = req.body.brukerNavn;
    const passord = req.body.passord;
    console.log(brukerNavn)
    console.log(passord)

    const authenticateResult = await authenticate(brukerNavn, passord);
    console.log(authenticateResult)

    if (authenticateResult == "authenticated") {
      // Continue with the getTournaments logic here
      console.log("registrert");
      let query = 'SELECT sport FROM brukere WHERE brukerNavn = ?';
      let values = [brukerNavn];
      connection.query(query, values, async function (error, results, fields) {
        let tournamentQuery = 'SELECT * FROM turneringer WHERE turneringsSport = ?';
        let tournamentValues = [results[0].sport];
        connection.query(tournamentQuery, tournamentValues, function (error, results, fields) {
          if (error) throw error;
          res.send(JSON.stringify(results));
        });
      })
      // const tournaments = await getTournaments(); // Assuming you have a function to fetch tournaments
      // res.send(JSON.stringify(tournaments));
    } else {
      console.log("ikke registrert");
      res.send(JSON.stringify("Feil brukernavn eller passord"));
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/getPlayers", async (req, res) => {
  try {
    const brukerNavn = req.body.brukerNavn;
    const passord = req.body.passord;
    console.log(brukerNavn);
    console.log(passord);

    const authenticateResult = await authenticate(brukerNavn, passord);
    console.log(authenticateResult);

    if (authenticateResult == "authenticated") {
      // Continue with the getTournaments logic here
      console.log("registrert");
      let query = 'SELECT sport FROM brukere WHERE brukerNavn = ?';
      let values = [brukerNavn];
      connection.query(query, values, async function (error, results, fields) {
        console.log(results[0].sport);
        if (error) {
          console.error(error);
          res.status(500).send({ error: "Internal Server Error" });
          return;
        }
        let query = 'SELECT forNavn, etterNavn FROM brukere WHERE sport = ?';
        let values = [results[0].sport];
        connection.query(query, values, async function (error, results, fields) {
          if (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error" });
            return;
          }
          console.log(results)
          res.send(JSON.stringify(results));
        });
      });
    } else {
      console.log("ikke registrert");
      res.send(JSON.stringify("Feil brukernavn eller passord"));
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send({ error: "Internal Server Error" });
  }
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
    let brukerNavn = userCredentials.brukerNavn;
    let passord = userCredentials.passord;
    console.log(brukerNavn)
    console.log(passord)
    let query = 'SELECT passord FROM brukere WHERE brukerNavn = ?';
    let values = [brukerNavn];
    connection.query(query, values, async function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        res.send(JSON.stringify("Feil brukernavn eller passord"));
        return;
      }
      console.log(results)
      console.log(results[0].passord)
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
    // Handle the error appropriately
    res.status(500).send({ error: "Internal Server Error" });
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

function authenticate(brukerNavn, passord) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT passord FROM brukere WHERE brukerNavn = ?';
    let values = [brukerNavn];
    connection.query(query, values, async function (error, results, fields) {
      if (error) {
        reject(error);
        return;
      }
      if (results.length === 0) {
        resolve("Feil brukernavn eller passord");
        return;
      }
      console.log("results", results);
      console.log("results[0].passord", results[0].passord);

      const match = await bcrypt.compare(passord, results[0].passord);
      if (match) {
        resolve("authenticated");
        console.log("authenticated");
      } else {
        resolve("Feil brukernavn eller passord");
        console.log("Feil brukernavn eller passord");
      }
      // if (!match) {
      //   resolve("Feil brukernavn eller passord");
      // } else {
      //   resolve("authenticated");
      // }
    });
  });
}
app.listen(8081, () => console.log("Server started on port 8081"));

