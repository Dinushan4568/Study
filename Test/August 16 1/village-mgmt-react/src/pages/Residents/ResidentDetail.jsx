import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const makeResidenceCertificate = (resident) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Residence Certificate', 105, 16, { align: 'center' });
  doc.setFontSize(11);
  doc.text(`This is to certify that ${resident.fullName}, NIC ${resident.nic},`, 14, 30);
  doc.text(`residing at ${resident.address}, belongs to family ${resident.familyId}.`, 14, 38);
  doc.text(`Issued on ${new Date().toLocaleDateString()}.`, 14, 46);

  autoTable(doc, {
    startY: 60,
    head: [['Field', 'Value']],
    body: [
      ['Full Name', resident.fullName],
      ['NIC', resident.nic],
      ['DOB', resident.dob],
      ['Gender', resident.gender],
      ['Address', resident.address],
      ['Occupation', resident.occupation || ''],
      ['Marital Status', resident.maritalStatus || '']
    ]
  });
  doc.save(`residence_certificate_${resident.id}.pdf`);
};

export default function ResidentDetail() {
  const { id } = useParams();
  const { db } = useData();
  const r = db.residents.find(x => x.id === Number(id));
  if (!r) return <div>Not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{r.fullName}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-white dark:bg-slate-900">
          <div><b>NIC:</b> {r.nic}</div>
          <div><b>DOB:</b> {r.dob}</div>
          <div><b>Gender:</b> {r.gender}</div>
          <div><b>Phone:</b> {r.phone}</div>
          <div><b>Address:</b> {r.address}</div>
          <div><b>Family:</b> {r.familyId}</div>
        </div>
      </div>
      <div className="no-print">
        <button className="px-3 py-2 border rounded" onClick={() => makeResidenceCertificate(r)}>Generate PDF</button>
        <button className="px-3 py-2 border rounded ml-2" onClick={() => window.print()}>Print page</button>
      </div>
    </div>
  );
}