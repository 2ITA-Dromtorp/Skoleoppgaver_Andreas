import './App.css';
import Navbar from './Navbar'
import Home from './Homepage'
import Kurs from './kurs';
import logo from './images/dromtorp-videregaende-skole.svg'
import LoginPage from './loginpage'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react'
import Login from './login';


function App() {


  return (
    <>
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/kurs/:kursnavn" element={<Kurs/>}/>
      <Route path="/loginpage" element={<LoginPage/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
    </>

  );
}

export default App;
