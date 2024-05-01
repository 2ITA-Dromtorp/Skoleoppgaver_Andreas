// import customersData from './test.json';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function StudentTable() {
    const [customersData, setCustomersData] = useState([]);

    if (sessionStorage.getItem("menneskeID") == null) {
        window.location.href = "/login"
    }
    useEffect(() => {
        axios.get('/getStudents').then((response) => {
            console.log(response.data)
            setCustomersData(response.data)
        })
    
    }, [onloadstart])

    return (
        <table className='styled_table'>
        <thead>
            <tr>
                <th>menneskeID</th>
                <th>Fornavn</th>
                <th>Etternavn</th>
                <th>Klasse</th>
                <th>tlf_foresatte</th>
                <th>learer</th>
                <th>tlf</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.menneskeID}>
                <td>{customer.menneskeID}</td>
                <td>{customer.Fornavn}</td>
                <td>{customer.Etternavn}</td>
                <td>{customer.Klasse}</td>
                <td>{customer.tlf_foresatte}</td>
                <td>{customer.learer}</td>
                <td>{customer.tlf}</td>
                
            </tr>
            ))}
        </tbody>
    </table>
    );

}