import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, InputAdornment, TextField, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Topbar: React.FC<{ search?: string; onSearch?: (v: string) => void }> = ({ search = '', onSearch }) => (
  <AppBar position="static" color="inherit" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
      <TextField
        placeholder="What do you want to find?"
        size="small"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch && onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { borderRadius: 3, bgcolor: 'background.default', minWidth: 320 },
        }}
        sx={{ width: 350 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton color="primary">
          <NotificationsIcon />
        </IconButton>
        <Avatar sx={{ width: 36, height: 36, ml: 1 }} src="https://randomuser.me/api/portraits/women/44.jpg" />
        <Box>
          <Typography fontWeight={600}>Priscilla Lily</Typography>
          <Typography variant="caption" color="text.secondary">Admin</Typography>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Topbar;
