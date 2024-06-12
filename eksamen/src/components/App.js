import '../App.css';
import {Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Register from './register';
import Login from './login';
import TicketSystem from './ticketSystem';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ticketSystem" element={<TicketSystem />} />
    </Routes>
  );

}

export default App;
