// import customersData from './test.json';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function EquipmentTable() {
    const [customersData, setCustomersData] = useState([]);
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

        axios.post('/laan', {"menneskeID":menneskeID, "bookedEquipment":bookedEquipment})
        .then((response) => {
            console.log(response.data)
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
                <th>Pris</th>
                <th>Utlånt til</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.utstyrsID}>
                <td>{customer.utstyrsID}</td>
                <td>{customer.Kategori}</td>
                <td>{customer.Modell}</td>
                <td>{customer.Pris}</td>
                <td>{customer.menneskeID}</td>
                <button id={customer.utstyrsID} onClick={(e) => laan(e)}>Bestill</button>
            </tr>
            ))}
        </tbody>
    </table>
    );

}