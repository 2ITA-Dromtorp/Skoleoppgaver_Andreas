import { useState, useEffect } from "react";
import axios from "axios";

export default function Select() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const getCustomersData = () => {
            axios   
                .get("http://localhost:3001/")
                .then((response) => {
                    setCustomerData(response.data);
                })
                .catch(error => console.log(error));
        };
        getCustomersData();
    }, []);

    return (
        <div>
            <h2>Tabell</h2>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Fornavn</th>
                        <th>Etternavn</th>
                        <th>DatamaskinID</th>
                        <th>Hobby</th>
                        <th>Klasse</th>
                        <th>Kjønn</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {customerData.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.Fornavn}</td>
                            <td>{customer.Etternavn}</td>
                            <td>{customer.DatamaskinID}</td>
                            <td>{customer.Hobby}</td>
                            <td>{customer.Klasse}</td>
                            <td>{customer.Kjonn}</td>
                        </tr>
                    ))}        
                </tbody>
            </table>
        </div>
    );
}
