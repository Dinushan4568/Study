import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { parseISO } from 'date-fns';
import { useData } from '../context/DataContext';
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Reports() {
  const { db } = useData();
  const monthly = new Array(12).fill(0);
  db.residents.forEach(r => {
    const d = parseISO(r.createdAt || r.dob || new Date().toISOString());
    monthly[d.getMonth()]++;
  });

  const genderCounts = db.residents.reduce((acc, r) => { acc[r.gender] = (acc[r.gender] || 0) + 1; return acc; }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-4 border rounded bg-white dark:bg-slate-900">
        <h2 className="font-semibold mb-3">New Residents (by month)</h2>
        <Bar data={{ labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{ label: 'Residents', data: monthly, backgroundColor: '#60a5fa' }] }} />
      </div>
      <div className="p-4 border rounded bg-white dark:bg-slate-900">
        <h2 className="font-semibold mb-3">Gender Ratio</h2>
        <Doughnut data={{ labels: Object.keys(genderCounts),
          datasets: [{ data: Object.values(genderCounts), backgroundColor: ['#93c5fd','#fda4af','#a7f3d0'] }] }} />
      </div>
    </div>
  );
}