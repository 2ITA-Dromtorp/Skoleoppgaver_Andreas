import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EmailContext } from './context';
import { PasswordContext } from './context';
import { IsLoggedInContext } from './context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmailContext.Provider value="dark">
  <PasswordContext.Provider value="dark">
  <IsLoggedInContext.Provider value="dark">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </IsLoggedInContext.Provider>
  </PasswordContext.Provider>
  </EmailContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
