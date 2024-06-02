import logo from './logo.svg';
import './App.css';
import Homepage from './homepage';
import Products from './Products';
import Handlekurv from './handlekurv';
import NavBar from './NavBar';
import Admin from './admin';
import Kvittering from './kvittering';
import {Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Routes>
      {/* <Route path="/" element={<Homepage />} /> */}
      <Route path="/" element={<Products />} />
      <Route path="/handlekurv" element={<Handlekurv />} />
      <Route path="/kvittering" element={<Kvittering />} />
      <Route path='/admin' element={<Admin/>}/>
    </Routes>

  );
}

export default App;
