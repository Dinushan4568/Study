import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Stack, Paper, Button, Chip, Divider, LinearProgress, CircularProgress, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';

const navItems = [
  { label: 'Home', icon: <DashboardIcon /> },
  { label: 'Admin', icon: <AccountCircleIcon /> },
  { label: 'Students', icon: <PeopleIcon /> },
  { label: 'Teachers', icon: <SchoolIcon /> },
  { label: 'Library', icon: <LibraryBooksIcon /> },
  { label: 'Account', icon: <AccountCircleIcon /> },
  { label: 'Class', icon: <ClassIcon /> },
  { label: 'Subject', icon: <SubjectIcon /> },
  { label: 'Routine', icon: <EventNoteIcon /> },
  { label: 'Attendance', icon: <EventNoteIcon /> },
  { label: 'Exam', icon: <EventNoteIcon /> },
  { label: 'Notice', icon: <NotificationsIcon /> },
  { label: 'Transport', icon: <DirectionsBusIcon /> },
  { label: 'Hostel', icon: <HotelIcon /> },
];

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Replace with your backend endpoints
    fetch('/api/profile').then(res => res.json()).then(setProfile);
    fetch('/api/stats').then(res => res.json()).then(setStats);
    fetch('/api/attendance').then(res => res.json()).then(setAttendance);
    fetch('/api/results').then(res => res.json()).then(setResults);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="primary" mb={4} sx={{ letterSpacing: 1 }}>SP!K</Typography>
        <List sx={{ width: '100%' }}>
          {navItems.map((item) => (
            <ListItem button key={item.label} selected={item.label === 'Students'} sx={{ borderRadius: 2, mb: 0.5, bgcolor: item.label === 'Students' ? 'primary.100' : undefined }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: item.label === 'Students' ? 700 : 400, color: item.label === 'Students' ? 'primary.main' : 'text.primary' }} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        {/* User profile at the bottom */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, width: '100%' }}>
          <Avatar sx={{ width: 36, height: 36, mr: 1 }} src="https://randomuser.me/api/portraits/women/44.jpg" />
          <Box>
            <Typography fontWeight={600} fontSize={14}>Priscilla Lily</Typography>
            <Typography variant="caption" color="text.secondary">Admin</Typography>
          </Box>
        </Box>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, bgcolor: 'background.default' }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            placeholder="What do you want to find?"
            size="small"
            sx={{ width: 350 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 3, bgcolor: 'background.paper' },
            }}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton><MoreVertIcon /></IconButton>
            <Avatar sx={{ width: 36, height: 36, ml: 1 }} src="https://randomuser.me/api/portraits/women/44.jpg" />
            <Box>
              <Typography fontWeight={600}>Priscilla Lily</Typography>
              <Typography variant="caption" color="text.secondary">Admin</Typography>
            </Box>
          </Box>
        </Box>
        {/* Profile Card */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Box sx={{ flex: 2, bgcolor: 'primary.100', borderRadius: 3, p: 3, display: 'flex', alignItems: 'center', boxShadow: 1 }}>
            <Avatar sx={{ width: 64, height: 64, mr: 3 }} src="https://randomuser.me/api/portraits/women/44.jpg" />
            <Box>
              <Typography fontWeight={700} fontSize={20}>{profile?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{profile?.location}</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>{profile?.description}</Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" sx={{ borderRadius: 3, px: 4, fontWeight: 600 }}>View Full Profile</Button>
          </Box>
          <Box sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 3, p: 3, boxShadow: 1 }}>
            <Typography fontWeight={600} mb={2}>Attendance</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <CircularProgress variant="determinate" value={attendance?.present} size={80} thickness={6} sx={{ color: 'primary.main', position: 'absolute' }} />
              <Typography fontWeight={700} fontSize={22} sx={{ position: 'relative', zIndex: 1 }}>{attendance?.total}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box>
                <Chip label="Present" color="primary" size="small" />
                <Typography variant="caption">{attendance?.present}%</Typography>
              </Box>
              <Box>
                <Chip label="Absent" color="warning" size="small" />
                <Typography variant="caption">{attendance?.absent}%</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          {stats.map((stat, idx) => (
            <Box key={stat.label} sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 3, p: 3, boxShadow: 1 }}>
              <Typography fontWeight={700} fontSize={22} color="primary.main">{stat.value}</Typography>
              <Typography fontWeight={600} mb={1}>{stat.label}</Typography>
              <Typography variant="body2" color="text.secondary">{stat.desc}</Typography>
            </Box>
          ))}
        </Box>
        {/* Exam Results Table */}
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography fontWeight={700} fontSize={18}>All Exam Results</Typography>
            <TextField
              placeholder="Search by name or roll"
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: 'background.default' },
              }}
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map(row => (
                  <TableRow key={row.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox checked={row.checked} />
                    </TableCell>
                    <TableCell>
                      <Chip label={row.type} color={row.type === 'Fast Semester' ? 'secondary' : 'primary'} size="small" />
                    </TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell><Chip label={row.grade} color="success" size="small" /></TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary"><SearchIcon /></IconButton>
                      <IconButton color="error"><MoreVertIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
