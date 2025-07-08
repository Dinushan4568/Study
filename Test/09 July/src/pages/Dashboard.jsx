import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const getRole = () => localStorage.getItem('userRole');

const Dashboard = () => {
  const role = getRole();

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        {role === 'admin' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button component={Link} to="/individuals" variant="contained">Manage Individuals</Button>
            <Button component={Link} to="/households" variant="contained">Manage Households</Button>
            <Button component={Link} to="/lands" variant="contained">Manage Lands</Button>
            <Button component={Link} to="/users" variant="contained">Manage Users</Button>
            <Button component={Link} to="/add-individual" variant="outlined">Add Individual</Button>
            <Button component={Link} to="/add-household" variant="outlined">Add Household</Button>
            <Button component={Link} to="/add-land" variant="outlined">Add Land Record</Button>
            <Button component={Link} to="/submit-update" variant="outlined">Submit Update Request</Button>
          </Box>
        )}
        {role === 'gramasewaka' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button component={Link} to="/individuals" variant="contained">View Individuals</Button>
            <Button component={Link} to="/households" variant="contained">View Households</Button>
            <Button component={Link} to="/lands" variant="contained">View Lands</Button>
            <Button component={Link} to="/add-individual" variant="outlined">Add Individual</Button>
            <Button component={Link} to="/add-household" variant="outlined">Add Household</Button>
            <Button component={Link} to="/add-land" variant="outlined">Add Land Record</Button>
            <Button component={Link} to="/edit-data" variant="outlined">Edit Data</Button>
          </Box>
        )}
        {role === 'data_adder' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button component={Link} to="/add-individual" variant="contained">Add Data</Button>
            <Button component={Link} to="/submit-update" variant="outlined">Submit Update Request</Button>
          </Box>
        )}
        {!role && <Typography>Please <Link to="/login">login</Link> to access dashboard features.</Typography>}
      </Paper>
    </Container>
  );
};

export default Dashboard;
