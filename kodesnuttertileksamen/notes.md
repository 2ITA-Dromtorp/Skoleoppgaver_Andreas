<h1>Eksamensforbredende dokumentasjon </h1>
<p>Dette er et dokument med masse kodesnutter og dokumentasjon som skal forberede oss til eksamen. Det vil være kodesnutter med/uten forklaring som man kan lime inn i eget prosjekt i en eventuell utviklingsoppgave sånn at man slipper å gjøre basic oppsett for å spare tid, og mange andre ting. </p>

<summary><h2>Kodesnutter</h2> </summary>
<details>
<summary>Mapp funksjon </summary>
<details>
<summary>  Med forklaring</summary>

```jsx
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
</details>
<details>
<summary>  Bare kode</summary>

```jsx
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
