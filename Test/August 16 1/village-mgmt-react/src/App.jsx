import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResidentsList from './pages/Residents/ResidentsList';
import AddEditResident from './pages/Residents/AddEditResident';
import ResidentDetail from './pages/Residents/ResidentDetail';
import FamiliesList from './pages/Families/FamiliesList';
import FamilyDetail from './pages/Families/FamilyDetail';
import Reports from './pages/Reports';
import UsersList from './pages/Users/UsersList';
import AddEditUser from './pages/Users/AddEditUser';
import Contact from './pages/Contact';

import { useEffect, useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] dark:bg-slate-800 dark:text-slate-100">
      <Header onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />
      <div className="grid grid-cols-[16rem,1fr]">
        <Sidebar />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/residents" element={<ResidentsList />} />
              <Route path="/residents/new" element={<AddEditResident mode="add" />} />
              <Route path="/residents/:id" element={<ResidentDetail />} />
              <Route path="/residents/:id/edit" element={<AddEditResident mode="edit" />} />
              <Route path="/families" element={<FamiliesList />} />
              <Route path="/families/:familyId" element={<FamilyDetail />} />
              <Route path="/reports" element={<Reports />} />
              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/new" element={<AddEditUser mode="add" />} />
                <Route path="/users/:id/edit" element={<AddEditUser mode="edit" />} />
              </Route>
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}