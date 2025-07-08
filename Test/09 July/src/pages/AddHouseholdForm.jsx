import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';

const AddHouseholdForm = () => {
  const [form, setForm] = useState({
    family_name: '',
    house_number: '',
    address: '',
    nics: '' // comma-separated NICs
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    // Convert comma-separated NICs to array
    const data = { ...form, nics: form.nics.split(',').map(nic => nic.trim()).filter(Boolean) };
    try {
      const response = await fetch('/api/add_household.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('Household added successfully!');
        setForm({ family_name: '', house_number: '', address: '', nics: '' });
      } else {
        setStatus('Failed to add household.');
      }
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Add Household</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="family_name" label="Family Name" value={form.family_name} onChange={handleChange} required />
          <TextField name="house_number" label="House Number" value={form.house_number} onChange={handleChange} required />
          <TextField name="address" label="Address" value={form.address} onChange={handleChange} required />
          <TextField name="nics" label="NICs (comma-separated)" value={form.nics} onChange={handleChange} required />
          <Button type="submit" variant="contained">Add Household</Button>
          {status && <Typography color={status.includes('success') ? 'success.main' : 'error.main'}>{status}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddHouseholdForm;
