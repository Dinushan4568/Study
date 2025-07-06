import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Stack, Avatar, Chip, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
const gradeColor = (grade: string) => {
  switch (grade) {
    case 'A': return 'success';
    case 'B': return 'info';
    case 'C': return 'warning';
    default: return 'default';
  }
};

const Students: React.FC = () => {
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'info'|'error'}>({open: false, message: '', severity: 'success'});
  const [studentList, setStudentList] = useState<any[]>([]);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editStudent, setEditStudent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/students').then(res => res.json()).then(setStudentList);
    fetch('/api/teachers').then(res => res.json()).then(setTeacherList);
    fetch('/api/classes').then(res => res.json()).then(setClassList);
  }, []);

  const filtered = studentList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (student: any) => {
    setEditStudent(student);
    setEditDialog(true);
  };
  const handleSave = () => {
    setStudentList(studentList.map(s => s.id === editStudent.id ? editStudent : s));
    setEditDialog(false);
    setSnackbar({open: true, message: 'Student updated', severity: 'success'});
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" fontWeight={700} color="primary.main" mb={3} textAlign="center">
        Students
      </Typography>
      <TextField
        label="Search by name or class"
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
              <TableCell>Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Class</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No students found.</Typography>
                </TableCell>
              </TableRow>
            ) : filtered.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>{getInitials(student.name)}</Avatar>
                    <Typography fontWeight={500}>{student.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip label={student.grade} color={gradeColor(student.grade)} />
                </TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" onClick={() => handleEdit(student)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} TransitionComponent={Slide} keepMounted>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editStudent?.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditStudent(editStudent ? { ...editStudent, name: e.target.value } : null)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Grade"
            fullWidth
            value={editStudent?.grade || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditStudent(editStudent ? { ...editStudent, grade: e.target.value } : null)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Class"
            fullWidth
            value={editStudent?.class || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditStudent(editStudent ? { ...editStudent, class: e.target.value } : null)}
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

export default Students;
