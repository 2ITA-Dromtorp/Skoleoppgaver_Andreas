import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
    const [customersData, setCustomersData] = useState([]);
    useEffect(() => {
        getCustomersData();
    }, []);
    const getCustomersData = async () => {
      await axios
        .get("http://localhost:6969/select")
        .then(response => {
          setCustomersData(response.data);
          console.log(response.data)
        })
        .catch(error => console.log(error));
    };
    return (
        <div>
            <Link to="/quiz">Start</Link>
            <h1>Quiz</h1>
        </div>
    )
}