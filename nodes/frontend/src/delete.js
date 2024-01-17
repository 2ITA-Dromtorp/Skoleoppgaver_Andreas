import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Delete() {
const [elevID, setElevID] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log( elevID);
    Delete();
  };
  
const Delete = () => {
    console.log("Data slettes")
  const deleteData = {
    elevID: elevID,
  };

  console.log(deleteData);

  fetch('http://localhost:3001/delete', {
    method: 'DELETE',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(deleteData),
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
                    <div className='submitDiv'>
                        <input className='submitButton' type="submit" value="Slett bruker" />
                    </div>
                </form>
            </div>
        </main>
    );
}