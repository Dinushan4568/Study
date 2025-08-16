import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => (
  <NavLink to={to} className={({isActive}) => `block px-4 py-2 rounded ${isActive ? 'bg-sky-100 dark:bg-sky-900' : ''}`}>
    {label}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 border-r bg-slate-50 dark:bg-slate-900 min-h-screen">
      <nav className="flex flex-col gap-2">
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/residents" label="Residents" />
        <NavItem to="/families" label="Families" />
        <NavItem to="/reports" label="Reports" />
        <NavItem to="/users" label="Users (Admin)" />
        <NavItem to="/contact" label="Contact" />
      </nav>
    </aside>
  );
}