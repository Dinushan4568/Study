import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.role) {
          localStorage.setItem('userRole', data.role);
          navigate('/');
        } else {
          setError('Invalid credentials.');
        }
      } else {
        setError('Login failed.');
      }
    } catch {
      setError('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="username" label="Username" value={form.username} onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained">Login</Button>
          {error && <Typography color="error.main">{error}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
