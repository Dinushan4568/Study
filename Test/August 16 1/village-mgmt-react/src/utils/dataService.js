const KEY = 'vm-db-v1';

const fetchJSON = async (path) => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
};

export const loadDB = async () => {
  const ls = localStorage.getItem(KEY);
  if (ls) return JSON.parse(ls);

  const [residents, families, users, settings] = await Promise.all([
    fetchJSON('/data/residents.json'),
    fetchJSON('/data/families.json'),
    fetchJSON('/data/users.json'),
    fetchJSON('/data/settings.json')
  ]);

  const db = {
    residents: residents.residents || [],
    families: families.families || [],
    users: users.users || [],
    settings,
    activity: []
  };
  localStorage.setItem(KEY, JSON.stringify(db));
  return db;
};

export const saveDB = (db) => localStorage.setItem(KEY, JSON.stringify(db));
export const getDB = () => JSON.parse(localStorage.getItem(KEY) || '{}');

export const importBackup = (json) => {
  if (!json || !json.residents || !json.families || !json.users || !json.settings) {
    throw new Error('Invalid backup format');
  }
  localStorage.setItem(KEY, JSON.stringify({ ...json, activity: json.activity || [] }));
};