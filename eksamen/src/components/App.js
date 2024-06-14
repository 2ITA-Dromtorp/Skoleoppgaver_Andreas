import '../App.css';
import {Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
import Turneringer from './turneringer';
import Admin from './admin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/turneringer" element={<Turneringer />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );

}

export default App;
