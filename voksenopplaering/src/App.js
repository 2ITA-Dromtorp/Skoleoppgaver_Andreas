import './App.css';
import Navbar from './Navbar'
import Home from './Homepage'
import logo from './images/dromtorp-videregaende-skole.svg'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
