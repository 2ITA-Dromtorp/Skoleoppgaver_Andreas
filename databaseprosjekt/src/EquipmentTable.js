// import customersData from './test.json';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function EquipmentTable() {
    const [customersData, setCustomersData] = useState([]);
    // const [isBooked, setIsBooked] = useState(false);

    if (sessionStorage.getItem("menneskeID") == null) {
        window.location.href = "/login"
    }
    useEffect(() => {
        axios.get('/getEquipment').then((response) => {
            console.log(response.data)
            setCustomersData(response.data)
        })
    
    }, [onloadstart])


    function laan(e) {
        console.log(e.target.id)
        let menneskeID = sessionStorage.getItem("menneskeID")
        let bookedEquipment = e.target.id
        let utlaaner = sessionStorage.getItem("username")

        console.log(menneskeID, bookedEquipment, utlaaner)
        axios.post('/laan', {"menneskeID":menneskeID, "bookedEquipment":bookedEquipment, "utlaaner":utlaaner})
        .then((response) => {
            console.log(response.data)
            window.location.reload();
            // setIsBooked(true)
            
        })
        // (e) => window.location.href = `/order/${e.target.id}`
    }

    function avbestill(e) {
        console.log(e.target.id)
        let deleteID = 0
        let bookedEquipment = e.target.id

        axios.post('/delete', {"deleteID":deleteID, "bookedEquipment":bookedEquipment})
        .then((response) => {
            console.log(response.data)
            window.location.reload();
            // setIsBooked(false)
        })
        // (e) => window.location.href = `/order/${e.target.id}`
    }    

    return (
        <table className='styled_table'>
        <thead>
            <tr>
                <th>UtstyrsID</th>
                <th>Kategori</th>
                <th>Modell</th>
                <th>Utlånt til</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.utstyrsID}>
                <td>{customer.utstyrsID}</td>
                <td>{customer.Kategori}</td>
                <td>{customer.Modell}</td>
                <td>{customer.laaner}</td>
                {customer.menneskeID > 0 ? <button id={customer.utstyrsID} onClick={(e) => avbestill(e)}>Avbestill</button> : <button id={customer.utstyrsID} onClick={(e) => laan(e)}>Bestill</button>}
                

            </tr>
            ))}
        </tbody>
    </table>
    );

}