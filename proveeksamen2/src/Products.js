import cookie from './images/cookie.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Products() {
    const [merchData, setMerchData] = useState([]);
    
    useEffect(() => {
        const produktIdFromSession = JSON.parse(sessionStorage.getItem("produktId")) || sessionStorage.getItem("produktId");
        if(produktIdFromSession==null || produktIdFromSession.length && produktIdFromSession.length<1) sessionStorage.setItem("produktId",JSON.stringify([]));

        axios.get('/getMerchandise').then((response) => {
            console.log(response.data)
            setMerchData(response.data)
            console.log(merchData)
        })
        


    }, [onloadstart])


  
    let collatz = 6421
    setInterval(function checkOddOrEven() {

        console.log(collatz)
        if (collatz & 1 == 1) {
            // return "Number is odd";
            collatz = collatz * 3 + 1
            console.log(collatz)
            checkOddOrEven()
        } else if (collatz < 4) {
            console.log("Ferdig")
            alert("Ferdig")
            collatz = null
        }else {
            // return "Number is even";
            collatz = collatz / 2
            console.log(collatz)
            checkOddOrEven()
        }

    }, 1000/60);
    checkOddOrEven()
    function bestill(e){
        const arrayOfId = JSON.parse(sessionStorage.getItem("produktId"));
        console.log(arrayOfId)
        console.log(e.target.id)
        arrayOfId.push(e.target.id)
        sessionStorage.setItem("produktId", JSON.stringify(arrayOfId));
    }

    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
                {merchData.map((merch) => (
                    <div className='item' id={merch.produktID2}><img className='itemImage' src={merch.bildeBane}/><h2>{merch.produktNavn}</h2><p>{merch.pris} kr</p><p>{merch.antall}</p><button id={merch.produktID} className='bestillKnapp' onClick={(e) => bestill(e)}>Bestill</button></div>
                ))}
            </div>
        </div>
    ); 
}