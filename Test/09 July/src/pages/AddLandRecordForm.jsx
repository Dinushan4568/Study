import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

const AddLandRecordForm = () => {
  const [form, setForm] = useState({
    land_id: '',
    owner_nic: '',
    size: '',
    location: '',
    usage_type: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    // Convert size to float
    const data = { ...form, size: parseFloat(form.size) };
    try {
      const response = await fetch('/api/add_land_record.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('Land record added successfully!');
        setForm({ land_id: '', owner_nic: '', size: '', location: '', usage_type: '' });
      } else {
        setStatus('Failed to add land record.');
      }
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Add Land Record</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="land_id" label="Land Number" value={form.land_id} onChange={handleChange} required />
          <TextField name="owner_nic" label="Owner NIC" value={form.owner_nic} onChange={handleChange} required />
          <TextField name="size" label="Size (e.g. 12.5)" value={form.size} onChange={handleChange} type="number" required />
          <TextField name="location" label="Location" value={form.location} onChange={handleChange} required />
          <TextField name="usage_type" label="Usage Type" value={form.usage_type} onChange={handleChange} required />
          <Button type="submit" variant="contained">Add Land Record</Button>
          {status && <Typography color={status.includes('success') ? 'success.main' : 'error.main'}>{status}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddLandRecordForm;
