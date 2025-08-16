import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Header({ onToggleTheme }) {
  const { user, logout } = useAuth();
  const { db } = useData();
  return (
    <header className="site-header">
      <div className="brand">
        <div className="logo" aria-hidden>
          {/* small SVG logo */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v18M3 12h18" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{fontWeight:700}}>{db?.settings?.villageName || 'Demo Village'}</div>
          <div className="muted">Admin console</div>
        </div>
      </div>

      <div className="actions">
        <button className="btn secondary" onClick={onToggleTheme}>Theme</button>
        {user && (
          <>
            <div className="muted">{user.username} ({user.role})</div>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}