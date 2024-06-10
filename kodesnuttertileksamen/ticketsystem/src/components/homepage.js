import { useEffect, useState } from 'react';
import axios from 'axios'



function HomePage() {
    const [arrayData, setArrayData] = useState([]);
    
    useEffect(() => {
      axios.get('/api/getMerchandise').then((response) => {
        console.log(response.data)
        setArrayData(response.data)
      })
    }, [onloadstart])
  
  
    function bestill(e){
      let selectedID = e.target.id
      console.log(selectedID)
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