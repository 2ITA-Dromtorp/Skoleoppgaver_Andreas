

import Elev from './Elev';

 

export default function Klassekart() {

 

    return (

        <div className='container'>

 

      <div className='learer'>

 

        <Elev name="Lærer"/>

 

      </div>

     

      <div className='forste_rad'>

 

      <Elev name="Martin"/>

      <Elev name="Mathias"/>

      <div className='tompult'></div>

      <Elev name="Kevin"/>

      <div className='person'></div>

      <Elev name="Andreas"/>

 

      </div>

 

      <div className='andre_rad'>

 

      <Elev name="Falk"/>

      <Elev name="Sander"/>

      <div className='tompult'></div>

      <Elev name="Ylva"/>

      <Elev name="Vanessa"/>

      <Elev name="Chen"/>

 

      </div>

 

      <div className='tredje_rad'>

      <div className='person'></div>

      <div className='person'></div>

      <div className='tompult'></div>


      <Elev name="Luz"/>

      <div className='person'></div>

      <Elev name="Fritjof"/>

       

      </div>

 

 

 

    </div>

    )

}