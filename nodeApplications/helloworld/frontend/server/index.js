

const express = require('express')
const app = express()
const port = 3010
const mysql = require('mysql2');
app.use(express.static("build"));
app.use(express.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'node'
});

app.get('/', (request, response) => {

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.query('SELECT * from elev', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results))
    console.log("The solution is: ", JSON.stringify(results));
    response.send(JSON.stringify(results))
  })


  connection.end();

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

