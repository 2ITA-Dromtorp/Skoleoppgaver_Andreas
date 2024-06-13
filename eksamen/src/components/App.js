import '../App.css';
import {Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Register from './register';
import Login from './login';
import TicketSystem from './ticketSystem';
import Turneringer from './turneringer';
import Spillere from './spillere';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ticketSystem" element={<TicketSystem />} />
      <Route path="/turneringer" element={<Turneringer />} />
      <Route path="/spillere" element={<Spillere />} />
    </Routes>
  );

}

export default App;
