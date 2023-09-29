
import logo from './logo.svg';
import './App.css';
import Elev from './elev';
import NotElev from './notelev';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Andreas from './Andreas';
import Chen from './Chen';

function App() {


  return (
    
    <>


    <div className='container'>
      <header>
        <nav>
        <Link to="/"> <h2 className='logoText'>Klasseliste 2IM Drømtorp </h2></Link> 
        </nav>
      </header>
      <main className='klassen'>
      <Routes>
        <Route path="/Andreas" element={<Andreas/>}/>
      </Routes>
      <Routes>
        <Route path="/Chen" element={<Chen/>}/>
      </Routes>
      
      <div className='rad1'>
          

      <Elev name="Lærer"/>



      </div>

      <div className='rad2'>
      <Elev name="Martin"/>
      <Elev name="Mathias"/>
      <NotElev/>
      <Elev name="Kevin"/>
      <Elev name=""/>
      <Elev name="Andreas"/>

    
      </div>

      <div className='rad3'>
      <Elev name="Falk"/>
      <Elev name="Sander"/>
      <NotElev/>
      <Elev name="Ylva"/>
      <Elev name="Vanessa"/>
      <Elev name="Chen"/>
      </div>

      <div className='rad4'>
      <Elev name=""/>
      <Elev name=""/>
      <NotElev/>
      <Elev name="Luz"/>
      <Elev name=""/>
      <Elev name="Fridtjof"/>
      </div>
      </main>
      <footer>

      </footer>
    </div>

      

      </>
  );
}


export default App;
