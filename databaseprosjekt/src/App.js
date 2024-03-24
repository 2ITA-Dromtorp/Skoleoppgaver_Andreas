import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Home';
import Login from './Login';
import EquipmentTable from './EquipmentTable';

function App() {
    return(

        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/equipmentTable" element={<EquipmentTable />} />
        </Routes>

    )
}

export default App;
