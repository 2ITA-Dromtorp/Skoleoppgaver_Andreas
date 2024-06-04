<h1>Eksamensforbredende dokumentasjon </h1>
<p>Dette er et dokument med masse kodesnutter og dokumentasjon som skal forberede oss til eksamen. Det vil være kodesnutter med/uten forklaring som man kan lime inn i eget prosjekt i en eventuell utviklingsoppgave sånn at man slipper å gjøre basic oppsett for å spare tid, og mange andre ting. </p>

<summary><h2>Kodesnutter</h2> </summary>
<details>
<summary>Mapp funksjon </summary>
<details>
<summary>  Med forklaring</summary>

```jsx

//FRONTEND

//axios brukes fordi axios er best ;)
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Products() {
    const [arrayData, setArrayData] = useState([]);
    
    useEffect(() => {
        // Legg til eget API her
        axios.get('/getData').then((response) => {
            setArrayData(response.data)
        })
        //onloadstart velges sånn at appen bare vil kjøre denne funksjonen en gang, altså når appen lastes inn.
    }, [onloadstart])

    // VIKTIG!! FJERN ALLE HTML KOMMENTARER FRA KODEN OM DU BRUKER DENNE. DISSE ER BARE HER FOR FORKLARING OG VIL SKAPE PROBLEMER I REACT-PROSJEKTET DITT!
    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
            <!--This is a comment. Comments are not displayed in the browser-->
                {arrayData.map((array) => (

                    <!--Alt innenfor denne map funksjonen er bare eksempler som må byttes ut med egen data når du bruker denne kodesnutten. Om du skal bruke noe fra arrayet skal du skrive navnet til arrayet i parentesen i funksjonen og derreter skrive hvilken data du vil ha. Husk å ha curly-brackets rundt. F.eks. {array.navn} -->

                    <!--Eksempelkode -->
                    <h1>{array.navn}</h1>
                    <img src={array.bildeBane}>
                    <p>{array.pris}</p>
                ))}
            </div>
        </div>
    ); 
}
```

``` js

// BACKEND

//Backend modulene vi bruker
const express = require('express')
const port = process.env.PORT || 8081
const app = express()
app.use(express.static("build"));
app.use(express.json());
const cors = require("cors")
app.use(cors());
const mysql = require('mysql2');

// Et objekt med parameterene som brukes når vi kobler til databasen. dbConfig gjør ikke noe på egen hånd.
const dbConfig = {
    //Sjekk at brukernavn og passord stemmer, så lenge du bruker MAMP skal ikke dette være et problem (Om du heter Martin skal passordet være tomt, med mindre du har endret på det siden tirsdag 04.06.2024)
    user: 'root',
    password: 'root',
    //husk å velge riktig databasenavn
    database: 'kantinedatabase',
    //Dette trenger du ikke endre selv hvis du skal ha front-end på en pc og back-end på en annen
    host: 'localhost',
    // Om du bruker MAC-OS kan det hende at du må bytte port.
    port: 3306,
}

//Linjene under etablerer en tilkobling med databasen hver gang node-serveren starter, og bruker parameterene satt i dbConfig
const connection = mysql.createConnection(dbConfig);
connection.connect();
connection.connect((err) => {   if (err) {
    console.error('Error connecting to database:', err.stack);
    return;}
    console.log('Connected to database.'); });

//Får node-serveren til å høre etter når noen sender en request til porten definert øverst i backend koden.
app.listen(port, () => console.log("Server started" + port))

app.get("/getMerchandise", async (req, res) => {
    // Kobler til databasen og sender en spørring
    connection.connect( function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      }
      );
      //SQL spørringen som sendes til databasen
      connection.query('SELECT * FROM meny WHERE antall > 0', function (error, results, fields) {
        if (error) throw error;
        //Sender resultatet av spørringen til front-end
        res.send(JSON.stringify(results))
      });
  });
  

```
</details>
<details>
    <summary>Bare kode</summary>

```jsx

// FRONTEND

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Products() {
    const [arrayData, setArrayData] = useState([]);
    
    useEffect(() => {
        axios.get('/getData').then((response) => {
            setArrayData(response.data)
        })
    }, [onloadstart])


    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
                {arrayData.map((array) => (

                ))}
            </div>
        </div>
    ); 
}
```

```js

//BACKEND

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
    database: 'databasenavn',
    host: 'localhost',
    port: 3306,
}

const connection = mysql.createConnection(dbConfig);
connection.connect();
connection.connect((err) => {   if (err) {
    console.error('Error connecting to database:', err.stack);
    return;}
    console.log('Connected to database.'); });

app.listen(port, () => console.log("Server started" + port))

app.get("/getData", async (req, res) => {
    connection.connect( function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      }
      );
      connection.query('SELECT * FROM tabellnavn', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', JSON.stringify(""));
        res.send(JSON.stringify(results))
      });      
  });
  

```
</details>
</details>
<details>
<summary>Dependencies </summary>

| Name | Feature |
| -----| ------- |
| Express| Used to make API's and to handle different HTTP-requests from diferent URL's.|
| Cors | Makes it possible to use HTTP-requests on cross origins/devices.|
| FS| Filesystem used to store, acess and change data on device/operating system.|
| | |
| | |
| | |
| | |
| | |
| | |
</details>
