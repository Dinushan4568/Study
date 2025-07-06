import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Stack, Avatar, Snackbar, Alert, Slide } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const Teachers: React.FC = () => {
  const [studentList, setStudentList] = useState<any[]>([]);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'info'|'error'}>({open: false, message: '', severity: 'success'});
  const [addDialog, setAddDialog] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Teacher>({ id: 0, name: '', subject: '' });

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(setStudentList);
    fetch('/api/teachers')
      .then(res => res.json())
      .then(setTeacherList);
    fetch('/api/classes')
      .then(res => res.json())
      .then(setClassList);
  }, []);

  const handleEdit = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setTeacherList(teacherList.filter(t => t.id !== id));
    setSnackbar({open: true, message: 'Teacher deleted', severity: 'info'});
  };

  const handleSave = () => {
    if (editTeacher) {
      setTeacherList(teacherList.map(t => t.id === editTeacher.id ? editTeacher : t));
      setOpen(false);
      setSnackbar({open: true, message: 'Teacher updated', severity: 'success'});
    }
  };

  const handleAdd = () => {
    if (newTeacher.name && newTeacher.subject) {
      setTeacherList([...teacherList, { ...newTeacher, id: Date.now() }]);
      setAddDialog(false);
      setNewTeacher({ id: 0, name: '', subject: '' });
      setSnackbar({open: true, message: 'Teacher added', severity: 'success'});
    }
  };

  const filteredTeachers = teacherList.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={700} color="primary.main">Teachers</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialog(true)} sx={{ borderRadius: 3, boxShadow: 2 }}>Add Teacher</Button>
      </Stack>
      <TextField
        label="Search by name or subject"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        sx={{ mb: 3, width: '100%' }}
      />
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary">No teachers found.</Typography>
                </TableCell>
              </TableRow>
            ) : filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f5f5f5' } }}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{getInitials(teacher.name)}</Avatar>
                    <Typography fontWeight={500}>{teacher.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography>{teacher.subject}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(teacher)} size="small" color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(teacher.id)} size="small" color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} TransitionComponent={Slide} keepMounted>
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editTeacher?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTeacher(editTeacher ? { ...editTeacher, name: e.target.value } : null)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={editTeacher?.subject || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTeacher(editTeacher ? { ...editTeacher, subject: e.target.value } : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Add Dialog */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} TransitionComponent={Slide} keepMounted>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newTeacher.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={newTeacher.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
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

export default Teachers;
