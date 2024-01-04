const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql2');
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
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Use the pool to get a connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Connection failed!');
    throw err;
  }
  console.log('Connected to MySQL database!');

  // Define your routes and start the server only after establishing a connection
  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM elev';
    connection.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      console.log(JSON.stringify(result));
      console.log(result);
      res.json(result); // Send as JSON
    });
  });

  app.post('/create-user', (req, res) => {
    const b = req.body;
    const query = 'INSERT INTO elev (Fornavn, Etternavn, Klasse, Hobby, Kjonn, DatamaskinID) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [b.fornavn, b.etternavn, b.klasse, b.hobby, b.kjonn, b.datamaskinID];
    console.log('Executing query:', query, values);
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('User created successfully:', result);
        res.status(200).json({ message: 'User created successfully' });
      }
    });
  });
  // Start the server
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});

// Close the connection pool when the application is shutting down
process.on('SIGINT', () => {
  pool.end();
  process.exit();
});