import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/modern.css';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './context/DataContext';
import AuthProvider from './context/AuthContext';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);