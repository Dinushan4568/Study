import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function FamiliesList() {
  const { db } = useData();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Families</h1>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700"><tr>
            <th className="text-left p-2">Family ID</th><th className="text-left p-2">Head</th><th className="text-left p-2">Address</th><th></th>
          </tr></thead>
          <tbody>
          {db.families.map(f => {
            const head = db.residents.find(r => r.id === f.headResidentId);
            return (
              <tr key={f.familyId} className="border-t">
                <td className="p-2">{f.familyId}</td>
                <td className="p-2">{head?.fullName || '-'}</td>
                <td className="p-2">{f.address}</td>
                <td className="p-2"><Link to={`/families/${f.familyId}`} className="text-sky-600">View</Link></td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}