import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function UsersList() {
  const { db, deleteUser } = useData();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <Link to="/users/new" className="px-3 py-2 bg-sky-600 text-white rounded">Add User</Link>
      </div>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700"><tr>
            <th className="p-2 text-left">Username</th><th className="p-2 text-left">Role</th><th className="p-2 text-right">Actions</th>
          </tr></thead>
          <tbody>
            {db.users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 text-right">
                  <Link to={`/users/${u.id}/edit`} className="px-2 py-1 border rounded mr-2">Edit</Link>
                  <button className="px-2 py-1 border rounded text-rose-600" onClick={()=> { if (confirm('Delete user?')) deleteUser(u.id); }}>Delete</button>
                </td>
              </tr>
            ))}
            {!db.users.length && <tr><td colSpan={3} className="p-3">No users</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}