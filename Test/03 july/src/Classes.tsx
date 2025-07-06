import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Stack, Avatar, Chip, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const Classes: React.FC = () => {
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'info'|'error'}>({open: false, message: '', severity: 'success'});
  const [classList, setClassList] = useState<any[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editClass, setEditClass] = useState<any>(null);

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(setClassList);
  }, []);

  const filtered = classList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (cls: any) => {
    setEditClass(cls);
    setEditDialog(true);
  };
  const handleSave = () => {
    setClassList(classList.map(c => c.id === editClass.id ? editClass : c));
    setEditDialog(false);
    setSnackbar({open: true, message: 'Class updated', severity: 'success'});
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" fontWeight={700} color="primary.main" mb={3} textAlign="center">
        Classes
      </Typography>
      <TextField
        label="Search by class or teacher"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        sx={{ mb: 3, width: '100%' }}
      />
      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Class Name</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary">No classes found.</Typography>
                </TableCell>
              </TableRow>
            ) : filtered.map((cls) => (
              <TableRow key={cls.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'secondary.main', color: 'white' }}>{getInitials(cls.name)}</Avatar>
                    <Typography fontWeight={500}>{cls.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip label={cls.teacher} color="primary" />
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" onClick={() => handleEdit(cls)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} TransitionComponent={Slide} keepMounted>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Class Name"
            fullWidth
            value={editClass?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditClass(editClass ? { ...editClass, name: e.target.value } : null)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Teacher"
            fullWidth
            value={editClass?.teacher || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditClass(editClass ? { ...editClass, teacher: e.target.value } : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Classes;
