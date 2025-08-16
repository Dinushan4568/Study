import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ roles }) {
  const { user, hasRole } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!hasRole(roles)) return <div className="p-8">403 - Not authorized</div>;
  return <Outlet />;
}