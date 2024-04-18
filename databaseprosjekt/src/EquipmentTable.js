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

    return (
        <table className='styled_table'>
        <thead>
            <tr>
                <th>UtstyrsID</th>
                <th>Kategori</th>
                <th>Modell</th>
                <th>Pris</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.utstyrsID}>
                <td>{customer.utstyrsID}</td>
                <td>{customer.Kategori}</td>
                <td>{customer.Modell}</td>
                <td>{customer.Pris}</td>
            </tr>
            ))}
        </tbody>
    </table>
    );

}