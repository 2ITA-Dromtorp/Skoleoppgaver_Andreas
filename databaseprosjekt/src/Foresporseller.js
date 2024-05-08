// import customersData from './test.json';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Foresporseller() {
    const [customersData, setCustomersData] = useState([]);
    const navigate = useNavigate();
    // const [isBooked, setIsBooked] = useState(false);

    if (sessionStorage.getItem("menneskeID") == null) {
        window.location.href = "/login"
    }

    useEffect(() => {
        axios.get('/getRequests').then((response) => {
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

    function approveReq(e) {
        console.log(e.target.id)
        let username = sessionStorage.getItem("username")
        let password = sessionStorage.getItem("password")
        let acceptedRequest = e.target.id
        axios.post('/approveReq', {"username":username, "password":password, "acceptedRequest":acceptedRequest})
        .then((response) => {
            console.log(response.data)
            window.location.reload();
        })
        // (e) => window.location.href = `/order/${e.target.id}`
    }

    function rejectReq(e) {
        console.log(e.target.id)

        let rejectID = 0
        let rejectedRequest = e.target.id
        let utstyrID = e.target.utstyrID
        let elevID = e.target.elevID

        axios.post('/reject', {"rejectID":rejectID, "rejectedRequest":rejectedRequest, "utstyrstype":utstyrID, "elevID":elevID})
        .then((response) => {
            console.log(response.data)
            window.location.reload();
        })
        // (e) => window.location.href = `/order/${e.target.id}`
    }

    return (
        <table className='styled_table'>
        <thead>
            <tr>
                <th>LånID</th>
                <th>UtstyrsID</th>
                <th>Forespurt av</th>
                <th>Dato</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.utlanID}>
                <td>{customer.utlanID}</td>
                <td>{customer.utstyrstype}</td>
                <td>{customer.elevID}</td>
                <td>{customer.Dato}</td>
                <td>{customer.Status}</td>
                {sessionStorage.getItem("rolleID") == 1 ?  null :
                customer.Status === "Venter" ? 
                <div><button onClick={(e) => approveReq(e)} id={customer.utlanID} elevID={customer.elevID} utstyrID={customer.utstyrID} className='tableButton'>Godkjenn</button><button id={customer.utlanID} className='tableButton'>Avslå</button></div> : 
                customer.Status === "Godkjent" ? 
                null :
                customer.Status === "Levert" ?
                null :
                <p>Kan ikke hente status. Kontakt IT.</p>


}

            </tr>
            ))}
        </tbody>
    </table>
    );

}