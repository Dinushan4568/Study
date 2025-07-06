import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './Dashboard';
import Students from './Students';
import Teachers from './Teachers';
import Classes from './Classes';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        {/* Add more Figma-inspired pages here */}
      </Route>
    </Routes>
  </Router>
);

export default App;
