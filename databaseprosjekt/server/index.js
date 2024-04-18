const express = require("express");
const cors = require("cors");
const app = express();
const alphabet = require("./alphabet.json");
const https = require('https');
app.use(express.json());
app.use(cors());    
var fs = require('fs-sync');
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const replacementMap = require("./replacement.json")  
console.log(replacementMap)
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));
console.log(alphabet.alphabet[0])

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
  // connectionLimit: 10,
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

app.get("/getEquipment", async(req, res) => {
  try {
    const sql = 'SELECT * FROM utstyr';
    const [result] = await req.dbConnection.query(sql);
    console.log(JSON.stringify(result));
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
