import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './pages/Dashboard';
import Individuals from './pages/Individuals';
import Households from './pages/Households';
import Lands from './pages/Lands';
import Users from './pages/Users';
import LoginPage from './pages/LoginPage';
import SubmitUpdateRequest from './pages/SubmitUpdateRequest';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/individuals" element={<Individuals />} />
        <Route path="/households" element={<Households />} />
        <Route path="/lands" element={<Lands />} />
        <Route path="/users" element={<Users />} />
        <Route path="/submit-update" element={<SubmitUpdateRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
