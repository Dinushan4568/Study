import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function FamilyDetail() {
  const { familyId } = useParams();
  const { db } = useData();
  const family = db.families.find(f => f.familyId === familyId);
  const members = db.residents.filter(r => r.familyId === familyId);

  if (!family) return <div>Family not found</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Family {family.familyId}</h1>
      <div className="p-4 border rounded bg-white dark:bg-slate-900">
        <div><b>Address:</b> {family.address}</div>
        <div><b>Head:</b> {db.residents.find(r => r.id === family.headResidentId)?.fullName || '-'}</div>
      </div>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700"><tr>
            <th className="text-left p-2">Name</th><th className="text-left p-2">NIC</th><th className="text-left p-2">DOB</th><th className="text-left p-2">Gender</th>
          </tr></thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-t">
                <td className="p-2">{m.fullName}</td><td className="p-2">{m.nic}</td><td className="p-2">{m.dob}</td><td className="p-2">{m.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}