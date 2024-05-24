import logo from './logo.svg';
import './App.css';
import Homepage from './homepage';
import Products from './Products';
import Handlekurv from './handlekurv';
import NavBar from './NavBar';
import Kvittering from './kvittering';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useContext, useState } from 'react';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/handlekurv" element={<Handlekurv />} />
      <Route path="/kvittering" element={<Kvittering />} />
    </Routes>

  );
}

export default App;
