import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './game';
import { BulletAmountProvider } from './context';
import reportWebVitals from './reportWebVitals';
import { Link, BrowserRouter, Routes, Route, useContext } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BulletAmountProvider>  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
  </BulletAmountProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
