const express = require('express')
const port = process.env.PORT || 8081
const app = express()
app.use(express.static("build"));
app.use(express.json());
const cors = require("cors")
app.use(cors());
const mysql = require('mysql2');


const dbConfig = {
    user: 'root',
    password: 'root',
    //husk å velge riktig databasenavn
    database: 'kantinedatabase',
    host: 'localhost',
    // Om du bruker MAC-OS kan det hende at du må bytte port.
    port: 3306,
}

const connection = mysql.createConnection(dbConfig);
connection.connect();
connection.connect((err) => {   if (err) {
    console.error('Error connecting to database:', err.stack);
    return;}
    console.log('Connected to database.'); });

app.listen(port, () => console.log("Server started" + port))

app.get("/getMerchandise", async (req, res) => {
    console.log("waa")
    connection.connect( function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      }
      );
      connection.query('SELECT * FROM meny WHERE antall > 0', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', JSON.stringify(""));
        res.send(JSON.stringify(results))
      });

      
  });
   