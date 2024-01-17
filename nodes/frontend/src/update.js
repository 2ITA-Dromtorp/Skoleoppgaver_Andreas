import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Update() {
const [fornavn, setFornavn] = useState('');
const [etternavn, setEtternavn] = useState('');
const [klasse, setKlasse] = useState('');
const [hobby, setHobby] = useState('');
const [kjonn, setKjonn] = useState('');
const [datamaskinID, setDatamaskinID] = useState('');
const [elevID, setElevID] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log( elevID, fornavn, etternavn, klasse, hobby, kjonn, datamaskinID);
    update();
  };
  
const update = () => {
    console.log("Updatedata lages")
  const updateData = {
    fornavn: fornavn,
    etternavn: etternavn,
    klasse: klasse,
    hobby: hobby,
    kjonn: kjonn,
    datamaskinID: datamaskinID,
    elevID: elevID,
  };

  console.log(updateData);

  fetch('http://localhost:3001/update', {
    method: 'PUT',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(updateData),
  })
  .then(async (res) => {
    if (res.status === 404) {
      console.error('Endpoint not found. Check server configuration.');
      // Handle the 404 error appropriately
    } else if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
  });
};


    return (
        <main>
            <p>{fornavn}</p>
            <div className='loginForm'>
                <form onSubmit={handleSubmit}>
                <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="email">ElevID</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="elevID"
                                value={elevID}
                                onChange={(e) => setElevID(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="email">Fornavn:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="fornavn"
                                value={fornavn}
                                onChange={(e) => setFornavn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="password">Etternavn:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="etternavn"
                                value={etternavn}
                                onChange={(e) => setEtternavn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'> 
                            <label htmlFor="firstName">Klasse:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="klasse"
                                value={klasse}
                                onChange={(e) => setKlasse(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="lastName">Hobby:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="hobby"
                                value={hobby}
                                onChange={(e) => setHobby(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="lastName">Kjonn:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="kjonn"
                                value={kjonn}
                                onChange={(e) => setKjonn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='loginDiv'>
                        <div className='logintextDiv'>
                            <label htmlFor="lastName">DatamaskinID:</label>
                        </div>
                        <div className='labelDiv'>
                            <input
                                className='textInput'
                                type="text"
                                id="datamaskinID"
                                value={datamaskinID}
                                onChange={(e) => setDatamaskinID(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='submitDiv'>
                        <input className='submitButton' type="submit" value="Registrer deg" />
                    </div>
                </form>
            </div>
        </main>
    );
}