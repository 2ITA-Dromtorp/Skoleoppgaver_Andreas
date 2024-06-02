<details>
<summary>Mapp funksjon </summary>

```jsx
import cookie from './images/cookie.jpg';
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


    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
                {arrayData.map((array) => (
                    // Alt innenfor denne map funksjonen er bare eksempler som må byttes ut med egen data når du bruker denne kodesnutten. Om du skal bruke noe fra arrayet skal du skrive navnet til arrayet i parentesen i funksjonen og derreter skrive hvilken data du vil ha. Husk å ha curly-brackets rundt. F.eks. {array.navn}
                    
                ))}
            </div>
        </div>
    ); 
}
```

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