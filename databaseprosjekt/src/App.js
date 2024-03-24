import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Homepage from './Home';

function App() {
    return(

        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/aa" element={<Login />} />
        </Routes>

    )
}

export default App;
