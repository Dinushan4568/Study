import { useForm } from 'react-hook-form';
import { useData } from '../../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { isValidNIC, isValidPhone } from '../../utils/validation';

export default function AddEditResident({ mode }) {
  const { db, addResident, updateResident } = useData();
  const { id } = useParams();
  const navigate = useNavigate();

  const editing = mode === 'edit';
  const existing = editing ? db.residents.find(r => r.id === Number(id)) : null;

  const { register, handleSubmit } = useForm({
    defaultValues: existing || {
      fullName: '', nic: '', dob: '', gender: 'Male', phone: '', address: '', familyId: '', occupation: '', maritalStatus: 'Single'
    }
  });

  const onSubmit = (data) => {
    if (!isValidNIC(data.nic)) return alert('Invalid NIC');
    if (data.phone && !isValidPhone(data.phone)) return alert('Invalid phone');

    if (editing) {
      updateResident(existing.id, data);
    } else {
      addResident(data);
    }
    navigate('/residents');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">{editing ? 'Edit Resident' : 'Add Resident'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <label>Full Name<input className="w-full mt-1 px-3 py-2 border rounded" {...register('fullName', { required: true })} /></label>
        <label>NIC<input className="w-full mt-1 px-3 py-2 border rounded" {...register('nic', { required: true })} /></label>
        <label>DOB<input type="date" className="w-full mt-1 px-3 py-2 border rounded" {...register('dob', { required: true })} /></label>
        <label>Gender<select className="w-full mt-1 px-3 py-2 border rounded" {...register('gender', { required: true })}>
          <option>Male</option><option>Female</option><option>Other</option></select></label>
        <label>Phone<input className="w-full mt-1 px-3 py-2 border rounded" {...register('phone')} /></label>
        <label>Address<input className="w-full mt-1 px-3 py-2 border rounded" {...register('address')} /></label>
        <label>Family ID<input className="w-full mt-1 px-3 py-2 border rounded" {...register('familyId')} placeholder="e.g. FAM001" /></label>
        <label>Occupation<input className="w-full mt-1 px-3 py-2 border rounded" {...register('occupation')} /></label>
        <label>Marital Status<select className="w-full mt-1 px-3 py-2 border rounded" {...register('maritalStatus')}>
          <option>Single</option><option>Married</option><option>Divorced</option></select></label>

        <div className="col-span-2 flex gap-2 mt-2">
          <button className="px-4 py-2 bg-sky-600 text-white rounded" type="submit">{editing ? 'Save' : 'Create'}</button>
          <button className="px-4 py-2 border rounded" type="button" onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}