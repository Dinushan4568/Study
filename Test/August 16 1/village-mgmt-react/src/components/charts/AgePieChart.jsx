import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { differenceInYears } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AgePieChart({ residents = [] }) {
  const groups = { '0-17': 0, '18-35': 0, '36-60': 0, '60+': 0 };
  residents.forEach(r => {
    if (!r?.dob) return;
    const age = differenceInYears(new Date(), new Date(r.dob));
    if (age <= 17) groups['0-17']++;
    else if (age <= 35) groups['18-35']++;
    else if (age <= 60) groups['36-60']++;
    else groups['60+']++;
  });

  const data = {
    labels: Object.keys(groups),
    datasets: [{ data: Object.values(groups), backgroundColor: ['#93c5fd','#60a5fa','#3b82f6','#1d4ed8'] }]
  };

  return <Pie data={data} />;
}