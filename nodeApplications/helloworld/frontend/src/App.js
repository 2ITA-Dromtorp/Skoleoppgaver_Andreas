import logo from './logo.svg';
import './App.css';
import Navbar from './navbar';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Home from './homepage'

function App() {
  return (
    <div className='websiteContainer'>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
