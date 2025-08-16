import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Header({ onToggleTheme }) {
  const { user, logout } = useAuth();
  const { db } = useData();
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-slate-800">
      <div className="font-semibold">{db?.settings?.villageName || 'Village'}</div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700" onClick={onToggleTheme}>Theme</button>
        {user && (
          <>
            <span className="text-sm opacity-70">{user.username} ({user.role})</span>
            <button className="px-3 py-1 rounded bg-rose-600 text-white" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}