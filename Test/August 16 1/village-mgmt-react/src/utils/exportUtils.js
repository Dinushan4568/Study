
import Papa from 'papaparse';

export const downloadBlob = (filename, blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

export const exportResidentsCSV = (residents) => {
  const csv = Papa.unparse(residents);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(`residents_${Date.now()}.csv`, blob);
};

export const exportBackupJSON = (db) => {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  downloadBlob(`village_backup_${Date.now()}.json`, blob);
};