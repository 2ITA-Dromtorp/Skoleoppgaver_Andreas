const express = require('express')

const app = express()
const PORT = 8000;
const bcrypt = require("bcrypt")
const saltRounds = 10;
const mysql = require('mysql2');

app.use(express.static("build"));
app.use(express.json());


const dbConfig = {
    user: 'root',
    password: 'root',
    database: 'voksenlogin',
    host: 'localhost',
    port: 3306,
}

const connection = mysql.createConnection(dbConfig);
connection.connect();
app.listen(PORT, () => console.log("Server started" + PORT))

app.post('/create-user',(req, res) => {
    const b = req.body
    const number = parseInt(b.number)
    const query = 'INSERT INTO logintable (epost, Passord, Fornavn, Etternavn) VALUES (?, ?, ?, ?)'
    const values = [b.email, b.password, b.firstName, b.lastName]
    console.log(query, values)
    connection.query(query, values, (err, result) => {
        if (err){
            console.log(err)
            res.status(500).send(err)
        } else {
            res.status(200).send(result)  
        }
    })
})


app.post('/login',(req, res) => {
    const b = req.body
    const email = b.email;
    const password = b.password;
    const query = 'SELECT * FROM logintable WHERE epost = ? AND Passord = ?'
    const values = [email, password]


    connection.query(query, values, (err, result) => {
        if (err){
            console.log(err)
            res.status(500).send(err)
        } else {
            if(result.length > 0){
                res.status(200).send(result)  
            } else {
                res.status(401).send({ err: "Feil brukernavn eller passord" });
            }
        }
    })
}
  
)


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Andreasrov:Skole123@cluster0.igyiltn.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to Mlem!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);