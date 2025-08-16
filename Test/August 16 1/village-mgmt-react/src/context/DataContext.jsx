import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadDB, saveDB } from '../utils/dataService';
import { nextId, nextFamilyId } from '../utils/id';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const data = await loadDB();
    setDb(data);
    setLoading(false);
  })(); }, []);

  const commit = (partial, activity) => {
    setDb(prev => {
      const next = { ...prev, ...partial };
      if (activity) {
        const rid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
        next.activity = [
          { id: rid, at: new Date().toISOString(), ...activity },
          ...(prev.activity || [])
        ].slice(0, 100);
      }
      saveDB(next);
      return next;
    });
  };

  // Residents
  const addResident = (r) => {
    const id = nextId(db.residents);
    const createdAt = new Date().toISOString();
    const newR = { ...r, id, createdAt };
    commit({ residents: [newR, ...db.residents] }, { type: 'resident:add', refId: id, label: r.fullName });
    return id;
  };

  const updateResident = (id, patch) => {
    const residents = db.residents.map(r => r.id === id ? { ...r, ...patch } : r);
    commit({ residents }, { type: 'resident:update', refId: id, label: patch.fullName || '' });
  };

  const deleteResident = (id) => {
    const residents = db.residents.filter(r => r.id !== id);
    commit({ residents }, { type: 'resident:delete', refId: id });
  };

  // Families
  const addFamily = (family) => {
    const familyId = nextFamilyId(db.families);
    const newF = { ...family, familyId };
    commit({ families: [newF, ...db.families] }, { type: 'family:add', refId: familyId });
    return familyId;
  };

  const updateFamily = (familyId, patch) => {
    const families = db.families.map(f => f.familyId === familyId ? { ...f, ...patch } : f);
    commit({ families }, { type: 'family:update', refId: familyId });
  };

  const deleteFamily = (familyId) => {
    const families = db.families.filter(f => f.familyId !== familyId);
    commit({ families }, { type: 'family:delete', refId: familyId });
  };

  // Users
  const addUser = (user) => {
    const id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
    const newU = { ...user, id };
    commit({ users: [newU, ...db.users] }, { type: 'user:add', refId: id, label: user.username });
  };
  const updateUser = (id, patch) => {
    const users = db.users.map(u => u.id === id ? { ...u, ...patch } : u);
    commit({ users }, { type: 'user:update', refId: id });
  };
  const deleteUser = (id) => {
    const users = db.users.filter(u => u.id !== id);
    commit({ users }, { type: 'user:delete', refId: id });
  };

  const stats = useMemo(() => {
    if (!db) return null;
    return {
      totalResidents: db.residents.length,
      totalFamilies: db.families.length,
      documents: 0
    };
  }, [db]);

  const value = {
    db, loading, stats,
    addResident, updateResident, deleteResident,
    addFamily, updateFamily, deleteFamily,
    addUser, updateUser, deleteUser,
    setDb
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}