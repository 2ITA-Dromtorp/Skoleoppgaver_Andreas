import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Handlekurv() {
    const [dataArray, setDataArray] = useState([]);
    const [idArray, setIdArray] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [totalSum, setTotalSum] = useState(0);

    const navigate = useNavigate();

    function toomHandlekurv(){
        sessionStorage.clear()
        window.location.reload()
    }

    useEffect(() => {
        async function fetchData() {
            const produktid = JSON.parse(sessionStorage.getItem("produktId"));
            setIdArray(produktid);
            
            try {
                const response = await axios.post('/handlekurv', {
                    data: produktid
                });

                const result = response.data;

                setDataArray(result);

                // Create a map to easily lookup data by ID
                const dataMap = new Map(result.map(item => [item.produktID, item]));

                // Replace IDs in idArray with corresponding objects from dataArray
                const newArray = produktid.map(id => dataMap.get(parseInt(id, 10)));
                
                // Update the result array state
                setResultArray(newArray);

                let sum = 0;

                for (let i = 0; i < newArray.length; i++) {
                    sum += newArray[i].pris;
                }

                setTotalSum(sum);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);


    function betal(){


        if (totalSum > 0) {
        let tlfNummer = prompt('Skriv inn telefonnummer her:');
        if (tlfNummer) {
        axios.post('/betal', {
            data: idArray,
            tlf: tlfNummer,
            pris: totalSum
            // Pris er ikke nødvendig fordi de enten betaler i Vipps, eller i kasse hvor alle produkter må skannes for å betale uansett.
        }).then((response) => {
            console.log(response.data)
            sessionStorage.clear()
            sessionStorage.setItem("bestillingsID", response.data.bestillingsID)
            sessionStorage.setItem("data", response.data.data)
            sessionStorage.setItem("pris", response.data.pris)
            navigate('/kvittering')
        })
    } else {
        alert('Vennligst skriv inn telefonnummer');
    }
} else {
    alert('Vennligst legg til produkter i handlekurven før du betaler');
}
    }


    return (
        <div>
            <div className='handlekurvNav'>
                <div className='sumDiv'>
                    <h2>Total sum: {totalSum} kr</h2>
                </div>
                <div className='betalingsDiv'>
                    <p onClick={betal}>Betal her:</p>
                    <a className='betalingsKnapp' onClick={betal} href='#'><img src='https://cdn-assets-cloud.frontify.com/s3/frontify-cloud-files-us/eyJwYXRoIjoiZnJvbnRpZnlcL2ZpbGVcLzd4S0w5VGFRTllOUXY1NGRCNVpZLnN2ZyJ9:frontify:m-Br4GDyYZXU4MDviU3OgRpo9n0wqlkyHVXUlv_q63k?width=370'/></a>
                </div>
            </div>
        <div className='pageContainer'>
            <div className='toomHandlekurvDiv'>
                <button className='toomHandlekurv' onClick={toomHandlekurv}>Tøm handlekurv</button>
            </div>
            <div className='itemContainer'>
                
                {resultArray.map((item, index) => (
                    <div key={index}>
                          <div className='item'><img className='itemImage' src={item.bildeBane}/><h2>{item.produktNavn}</h2><p>{item.pris} kr</p></div>
                    </div>
                ))}

                </div>
                </div>
            
        </div>
    );
};
