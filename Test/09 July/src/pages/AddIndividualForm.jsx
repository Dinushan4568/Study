import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, Checkbox, FormControlLabel, Box } from '@mui/material';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const AddIndividualForm = () => {
  const [form, setForm] = useState({
    full_name: '',
    short_name: '',
    gender: '',
    address: '',
    mobile: '',
    birthdate: '',
    nic: '',
    job: '',
    married: false,
    image_url: '',
    qualifications: '',
    land_id: '',
    documents: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch('/api/add_individual.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setStatus('Individual added successfully!');
        setForm({
          full_name: '', short_name: '', gender: '', address: '', mobile: '', birthdate: '', nic: '', job: '', married: false, image_url: '', qualifications: '', land_id: '', documents: ''
        });
      } else {
        setStatus('Failed to add individual.');
      }
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Add Individual</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="full_name" label="Full Name" value={form.full_name} onChange={handleChange} required />
          <TextField name="short_name" label="Short Name" value={form.short_name} onChange={handleChange} required />
          <TextField select name="gender" label="Gender" value={form.gender} onChange={handleChange} required>
            <MenuItem value="">Select Gender</MenuItem>
            {genderOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </TextField>
          <TextField name="address" label="Address" value={form.address} onChange={handleChange} required />
          <TextField name="mobile" label="Mobile Number" value={form.mobile} onChange={handleChange} required />
          <TextField name="birthdate" label="Birthdate" type="date" value={form.birthdate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
          <TextField name="nic" label="NIC" value={form.nic} onChange={handleChange} required />
          <TextField name="job" label="Job Description" value={form.job} onChange={handleChange} />
          <FormControlLabel control={<Checkbox name="married" checked={form.married} onChange={handleChange} />} label="Married" />
          <TextField name="image_url" label="Image URL" value={form.image_url} onChange={handleChange} />
          <TextField name="qualifications" label="Qualifications" value={form.qualifications} onChange={handleChange} />
          <TextField name="land_id" label="Land Number" value={form.land_id} onChange={handleChange} />
          <TextField name="documents" label="Document URL" value={form.documents} onChange={handleChange} />
          <Button type="submit" variant="contained">Add Individual</Button>
          {status && <Typography color={status.includes('success') ? 'success.main' : 'error.main'}>{status}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddIndividualForm;
