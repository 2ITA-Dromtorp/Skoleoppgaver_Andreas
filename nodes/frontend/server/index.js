const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const cors = require('cors');
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const dbConfig = {
  user: 'root',
  password: 'root',
  database: 'dromtorp',
  host: 'localhost',
  port: 3306,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Middleware to handle database connection
async function dbMiddleware(req, res, next) {
  try {
    req.dbConnection = await pool.getConnection();
    next();
  } catch (err) {
    console.error('Failed to get a database connection!', err);
    res.status(500).send('Internal Server Error');
  }
}

// Middleware to release database connection
// function releaseDbConnection(req, res, next) {
//   if (req.dbConnection) {
//     req.dbConnection.release();
//   }
//   next();
// }

app.use(dbMiddleware);

app.get('/', async (req, res) => {
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

app.post('/faenhelvete', async (req, res) => {
  console.log('ROPEMAXX NÅ!');
  try {
    console.log("FUCK DEG")
    const b = req.body;
    const query = 'INSERT INTO elev (Fornavn, Etternavn, Klasse, Hobby, Kjonn, DatamaskinID) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [b.fornavn, b.etternavn, b.klasse, b.hobby, b.kjonn, parseInt(b.datamaskinID)];
    console.log('Executing query:', query, values);
    const [result] = await req.dbConnection.query(query, values);
    console.log('User created successfully:', result);
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // releaseDbConnection(req, res);
  }
});

app.put('/update', async (req, res) => {
  console.log('PRØVER Å OPPDATERE');
  try {
    const b = req.body;
    const query = 'UPDATE elev SET Fornavn = ?, Etternavn = ?, Klasse = ?, Hobby = ?, Kjonn = ?, DatamaskinId = ? WHERE ElevID = ?';
    const values = [b.fornavn, b.etternavn, b.klasse, b.hobby, b.kjonn, parseInt(b.datamaskinID), b.elevID];
    console.log('Executing query:', query, values);
    console.log("FHIAFHAIFUH")
    const [result] = await req.dbConnection.query(query, values);
    console.log('User created successfully:', result);
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // releaseDbConnection(req, res);
  }
});

app.delete('/delete', async (req, res) => {
  console.log('PRØVER Å OPPDATERE');
  try {
    const b = req.body;
    const query = 'DELETE FROM elev WHERE ElevID = ?;';
    const values = [b.elevID];
    console.log('Executing query:', query, values);
    console.log("FHIAFHAIFUH")
    const [result] = await req.dbConnection.query(query, values);
    console.log('User created successfully:', result);
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    // releaseDbConnection(req, res);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Close the connection pool when the application is shutting down


