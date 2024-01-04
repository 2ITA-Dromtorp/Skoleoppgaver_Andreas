import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TicketSystem from './homepage';
import Navbar from './navBar';
import Footer from './footer';
function App() {
  return (
    <div className='pageContainer'>
    <Navbar/>
    <Routes>
      <Route path="/" element={<TicketSystem />} />
    </Routes>
    <Footer/>
    </div>

  );
}

export default App;
