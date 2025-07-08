import { Container, Paper, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const Users = () => {
  const [form, setForm] = useState({
    username: '', password: '', role: '', nic: '', email: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch('/api/add_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setStatus('User added successfully!');
        setForm({ username: '', password: '', role: '', nic: '', email: '' });
      } else {
        setStatus('Failed to add user.');
      }
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Add User</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="username" label="Username" value={form.username} onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
          <TextField select name="role" label="Role" value={form.role} onChange={handleChange} required>
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="gramasewaka">Gramasewaka</MenuItem>
            <MenuItem value="data_adder">Data Adder</MenuItem>
          </TextField>
          <TextField name="nic" label="NIC (optional)" value={form.nic} onChange={handleChange} />
          <TextField name="email" label="Email (optional)" value={form.email} onChange={handleChange} />
          <Button type="submit" variant="contained">Add User</Button>
          {status && <Typography color={status.includes('success') ? 'success.main' : 'error.main'}>{status}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default Users;
