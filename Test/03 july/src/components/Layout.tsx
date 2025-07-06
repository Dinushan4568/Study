import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
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
import Topbar from './Topbar';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Students', path: '/students', icon: <PeopleIcon /> },
  { label: 'Teachers', path: '/teachers', icon: <SchoolIcon /> },
  { label: 'Classes', path: '/classes', icon: <ClassIcon /> },
  { label: 'Library', path: '/library', icon: <LibraryBooksIcon /> },
  { label: 'Account', path: '/account', icon: <AccountCircleIcon /> },
  { label: 'Subject', path: '/subject', icon: <SubjectIcon /> },
  { label: 'Routine', path: '/routine', icon: <EventNoteIcon /> },
  { label: 'Attendance', path: '/attendance', icon: <EventNoteIcon /> },
  { label: 'Exam', path: '/exam', icon: <EventNoteIcon /> },
  { label: 'Notice', path: '/notice', icon: <NotificationsIcon /> },
  { label: 'Transport', path: '/transport', icon: <DirectionsBusIcon /> },
  { label: 'Hostel', path: '/hostel', icon: <HotelIcon /> },
];

const Layout: React.FC = () => {
  const [search, setSearch] = React.useState('');
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="primary" mb={4} sx={{ letterSpacing: 1 }}>SP!K</Typography>
        <List sx={{ width: '100%' }}>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{ borderRadius: 2, mb: 0.5 }}
              style={(props: any) => ({ background: props.isActive ? '#e3e8fd' : undefined })}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
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
      <Box sx={{ flex: 1, p: 0, bgcolor: 'background.default' }}>
        <Topbar search={search} onSearch={setSearch} />
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
