import { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { exportResidentsCSV } from '../../utils/exportUtils';

export default function ResidentsList() {
  const { db, deleteResident } = useData();
  const [q, setQ] = useState('');
  const [gender, setGender] = useState('');

  const filtered = useMemo(() => {
    const f = db.residents.filter(r => {
      const hit = r.fullName.toLowerCase().includes(q.toLowerCase()) || (r.nic || '').includes(q);
      const g = gender ? r.gender === gender : true;
      return hit && g;
    });
    return f;
  }, [db.residents, q, gender]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input className="px-3 py-2 border rounded w-full max-w-md" placeholder="Search by name or NIC" value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="px-3 py-2 border rounded" value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <Link to="/residents/new" className="px-3 py-2 bg-sky-600 text-white rounded">Add</Link>
        <button onClick={()=>exportResidentsCSV(filtered)} className="px-3 py-2 border rounded">Export CSV</button>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="text-left p-2">NIC</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Gender</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Family</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.nic}</td>
                <td className="p-2"><Link to={`/residents/${r.id}`} className="text-sky-600">{r.fullName}</Link></td>
                <td className="p-2">{r.gender}</td>
                <td className="p-2">{r.phone}</td>
                <td className="p-2">{r.familyId}</td>
                <td className="p-2 text-right">
                  <Link to={`/residents/${r.id}/edit`} className="px-2 py-1 border rounded mr-2">Edit</Link>
                  <button className="px-2 py-1 border rounded text-rose-600" onClick={()=> {
                    if (confirm('Delete resident?')) deleteResident(r.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td className="p-4" colSpan={6}>No results</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}