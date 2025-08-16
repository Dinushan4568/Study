import { createContext, useContext, useEffect, useState } from 'react';
import { useData } from './DataContext';

const SESSION_KEY = 'vm-session-v1';

const sha256 = async (text) => {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2,'0')).join('');
};

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const { db } = useData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sess = localStorage.getItem(SESSION_KEY);
    if (sess) setUser(JSON.parse(sess));
  }, []);

  const login = async (username, password) => {
    if (!db) throw new Error('Data not ready');
    const found = db.users.find(u => u.username === username);
    if (!found) throw new Error('Invalid credentials');

    const salt = found.salt || '';
    let ok = false;
    if (found.passwordHash) {
      const hash = await sha256(password + salt);
      ok = (hash === found.passwordHash);
    } else if (found.password) {
      ok = (password === found.password);
    }
    if (!ok) throw new Error('Invalid credentials');

    const session = { id: found.id, username: found.username, role: found.role };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const hasRole = (roles) => (!roles?.length) || roles.includes(user?.role);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}