import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AgePieChart from '../components/charts/AgePieChart';
import { exportBackupJSON } from '../utils/exportUtils';
import { importBackup } from '../utils/dataService';
// If your editor still complains, try explicitly adding the extension:

export default function Dashboard() {
  const { db, stats } = useData();
  if (!db) return null;

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      importBackup(json);
      alert('Imported! The app will reload to apply changes.');
      location.reload();
    } catch {
      alert('Invalid backup JSON.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <div className="text-xs opacity-60">Residents</div>
          <div className="text-3xl font-semibold">{stats.totalResidents}</div>
        </div>
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <div className="text-xs opacity-60">Families</div>
          <div className="text-3xl font-semibold">{stats.totalFamilies}</div>
        </div>
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <div className="text-xs opacity-60">Documents</div>
          <div className="text-3xl font-semibold">{stats.documents}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link to="/residents/new" className="px-3 py-2 bg-sky-600 text-white rounded">Add Resident</Link>
        <button onClick={() => exportBackupJSON(db)} className="px-3 py-2 border rounded">Backup JSON</button>
        <label className="px-3 py-2 border rounded cursor-pointer">
          Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <h2 className="font-semibold mb-3">Age Group Distribution</h2>
          <AgePieChart residents={db.residents} />
        </div>
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 max-h-72 overflow-auto">
            {db.activity?.map(a => (
              <li key={a.id} className="text-sm">
                <span className="opacity-60">{new Date(a.at).toLocaleString()} — </span>
                <span>{a.type} {a.label || ''}</span>
              </li>
            )) || <li>No activity yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}