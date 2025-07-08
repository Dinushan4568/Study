import { Container, Paper, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';

const fields = [
  { value: 'full_name', label: 'Full Name' },
  { value: 'short_name', label: 'Short Name' },
  { value: 'gender', label: 'Gender' },
  { value: 'address', label: 'Address' },
  { value: 'mobile', label: 'Mobile Number' },
  { value: 'birthdate', label: 'Birthdate' },
  { value: 'job', label: 'Job Description' },
  { value: 'married', label: 'Marriage Status' },
  { value: 'image_url', label: 'Image URL' },
  { value: 'qualifications', label: 'Qualifications' },
  { value: 'land_id', label: 'Land Number' },
  { value: 'documents', label: 'Document URL' }
];

const SubmitUpdateRequest = () => {
  const [form, setForm] = useState({ target_nic: '', field_to_update: '', old_value: '', new_value: '' });
  const [status, setStatus] = useState('');
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/get_update_requests.php');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch {}
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const userId = localStorage.getItem('userId');
      const payload = { ...form, requested_by: userId };
      const response = await fetch('/api/submit_update_request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setStatus('Request submitted!');
        setForm({ target_nic: '', field_to_update: '', old_value: '', new_value: '' });
        fetchRequests();
      } else {
        setStatus('Failed to submit request.');
      }
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Submit Update Request</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="target_nic" label="Target NIC" value={form.target_nic} onChange={handleChange} required />
          <TextField select name="field_to_update" label="Field to Update" value={form.field_to_update} onChange={handleChange} required>
            <MenuItem value="">Select Field</MenuItem>
            {fields.map(f => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}
          </TextField>
          <TextField name="old_value" label="Old Value" value={form.old_value} onChange={handleChange} required />
          <TextField name="new_value" label="New Value" value={form.new_value} onChange={handleChange} required />
          <Button type="submit" variant="contained">Submit Request</Button>
          {status && <Typography color={status.includes('success') ? 'success.main' : 'error.main'}>{status}</Typography>}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Past Update Requests</Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Target NIC</th>
                  <th>Field</th>
                  <th>Old Value</th>
                  <th>New Value</th>
                  <th>Status</th>
                  <th>Requested At</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 && (
                  <tr><td colSpan="7">No requests found.</td></tr>
                )}
                {requests.map(r => (
                  <tr key={r.request_id}>
                    <td>{r.request_id}</td>
                    <td>{r.target_nic}</td>
                    <td>{r.field_to_update}</td>
                    <td>{r.old_value}</td>
                    <td>{r.new_value}</td>
                    <td>{r.status}</td>
                    <td>{r.requested_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubmitUpdateRequest;
