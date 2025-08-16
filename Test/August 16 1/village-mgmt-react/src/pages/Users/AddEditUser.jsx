import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';

const sha256 = async (text) => {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2,'0')).join('');
};

export default function AddEditUser({ mode }) {
  const { db, addUser, updateUser } = useData();
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = mode === 'edit' ? db.users.find(u => u.id === id) : null;
  const { register, handleSubmit } = useForm({
    defaultValues: existing || { username: '', role: 'clerk', salt: 'demo123', password: '' }
  });

  const onSubmit = async (data) => {
    const payload = { username: data.username, role: data.role, salt: data.salt };
    if (data.password) payload.passwordHash = await sha256(data.password + data.salt);
    if (mode === 'edit') updateUser(existing.id, payload);
    else addUser(payload);
    navigate('/users');
  };

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-semibold mb-4">{mode === 'edit' ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="block">Username<input className="w-full mt-1 px-3 py-2 border rounded" {...register('username', { required: true })} /></label>
        <label className="block">Role
          <select className="w-full mt-1 px-3 py-2 border rounded" {...register('role')}>
            <option value="admin">admin</option>
            <option value="clerk">clerk</option>
            <option value="viewer">viewer</option>
          </select>
        </label>
        <label className="block">Salt<input className="w-full mt-1 px-3 py-2 border rounded" {...register('salt')} /></label>
        <label className="block">Password (leave blank to keep)<input type="password" className="w-full mt-1 px-3 py-2 border rounded" {...register('password')} /></label>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">Save</button>
          <button className="px-4 py-2 border rounded" type="button" onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}