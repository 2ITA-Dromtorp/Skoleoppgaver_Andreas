const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use the promise-based API

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const dbConfig = {
    user: 'root',
    password: 'root',
    database: 'eksamen2024',
    host: 'localhost',
    port: 8889,
};

const pool = mysql.createPool(dbConfig); // Create a connection pool

app.listen(port, () => console.log(`Server started on port ${port}`));

// For å vise utstyr på home.js
app.get('/home', async (request, response) => {
    try {
        const [results] = await pool.query('SELECT productId, productName, productCount, productPrice, productInfo, productPath FROM product');
        response.json(results);
    } catch (error) {
        console.error('Error executing query:', error);
        response.status(500).send('Server error');
    }
});

// Handlekurv
app.post('/bestill', async (request, response) => {
    try {
        const b = request.body;
        const data = b.data;

        data.sort();

        const arrayOfDifferentNumbers = [];
        let querystring = "SELECT productId, productName, productCount, productPrice, productInfo, productPath FROM product WHERE false";

        for (let i = 0; i < data.length; i++) {
            if (i > 0 && data[i] === data[i - 1]) continue;
            arrayOfDifferentNumbers.push(parseInt(data[i]));
            querystring += " OR productId = ?";
        }

        const [results] = await pool.query(querystring, arrayOfDifferentNumbers);

        const finishedList = [];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < arrayOfDifferentNumbers.length; j++) {
                if (data[i] != arrayOfDifferentNumbers[j]) continue;
                finishedList.push(results[j]);
                break;
            }
        }

        response.status(200).send({ data: finishedList });
    } catch (error) {
        console.error('Error executing query:', error);
        response.status(500).send('Server error');
    }
});

// Betaling
app.post('/betal', async (req, res) => {
    try {
        const b = req.body;
        const data = b.data;
        const bedriftsNavn = b.bedriftsNavn;
        const fornavn = b.fornavn;
        const etternavn = b.etternavn;
        const epost = b.epost;
        const tlf = b.tlf;
        const betaling = b.betaling;
        const firmaadresse = b.firmaadresse;
        const leveringssted = b.leveringssted;

        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).send('Ingen produkter sendt med forespørselen.');
        }

        const produkter = JSON.stringify(data);

        if (!epost) {
            return res.status(400).send('E-postadresse er påkrevd.');
        }

        const pris = b.pris;
        if (typeof pris !== 'number' || pris <= 0) {
            return res.status(400).send('Ugyldig pris oppgitt.');
        }

        const dato = new Date();
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        };
        const formattedDate = dato.toLocaleString('en-GB', options).replace(',', '');

        // Sett inn bestilling i databasen
        const bestillingsQuery = `INSERT INTO orders (orderId, orderSum, orderDate, orderAdress, company, firstname, surname, email, mobileNumb, paymentOption, shippingAdress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(bestillingsQuery, [produkter, pris, formattedDate, firmaadresse, bedriftsNavn, fornavn, etternavn, epost, tlf, betaling, leveringssted]);

        const [rows] = await pool.query(`SELECT MAX(orderNum) AS maxID FROM orders`);
        const bestillingsID = rows[0].maxID;

        if (!bestillingsID) {
            return res.status(500).send('Kunne ikke hente bestillingsID fra databasen.');
        }

        // Oppdater produktantall
        for (let i = 0; i < data.length; i++) {
            let sql = `UPDATE product SET productCount = productCount - 1 WHERE productId = ?`;
            await pool.query(sql, [data[i]]);
        }

        res.status(200).send('Betaling gjennomført.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error: ' + err.message);
    }
});
