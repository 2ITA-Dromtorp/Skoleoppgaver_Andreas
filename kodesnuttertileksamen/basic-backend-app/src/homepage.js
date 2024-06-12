import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {

    const [arrayData, setArrayData] = useState([]);
    
    useEffect(() => {
      const produktIdFromSession = JSON.parse(sessionStorage.getItem("produktId")) || sessionStorage.getItem("produktId");
      if(produktIdFromSession==null || produktIdFromSession.length && produktIdFromSession.length<1) sessionStorage.setItem("produktId",JSON.stringify([]));
      axios.get('/getMerchandise').then((response) => {
        console.log(response.data)
        setArrayData(response.data)
      })
    }, [onloadstart])


    function bestill(e){

      
      const arrayOfId = JSON.parse(sessionStorage.getItem("produktId"));
      console.log(arrayOfId)
      console.log(e.target.id)
      arrayOfId.push(e.target.id)
      sessionStorage.setItem("produktId", JSON.stringify(arrayOfId));
  }

    return (
        <div className='pageContainer'>
            <div className='itemContainer'>
                {arrayData.map((array) => (
                  <div className='item' id={array.produktID2}><img className='itemImage' src={array.bildeBane}/><h2>{array.produktNavn}</h2><h3>{array.pris},-</h3><p>{array.antall} på lager</p><button id={array.produktID} className='bestillKnapp' onClick={(e) => bestill(e)}>Bestill</button></div>
                ))}
            </div>
        </div>
    ); 
}

export default HomePage;
