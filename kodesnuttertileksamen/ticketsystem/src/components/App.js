import '../App.css';
import {Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Register from './register';
import Login from './login';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );

}

export default App;
