import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Home';
import Login from './Login';
import EquipmentTable from './EquipmentTable';
import StudentTable from './StudentTable';
import Register from './Register';
import Foresporseller from './Foresporseller';

function App() {
    return(

        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/equipmentTable" element={<EquipmentTable />} />
            <Route path="/studentTable" element={<StudentTable />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Foresporseller" element={<Foresporseller />} />
        </Routes>

    )
}

export default App;
