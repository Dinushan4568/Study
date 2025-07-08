import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './main';

const Navbar = () => {
  const colorMode = useContext(ColorModeContext);
  const isDark = colorMode.mode === 'dark';

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Grama Details
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/individuals">Individuals</Button>
        <Button color="inherit" component={Link} to="/households">Households</Button>
        <Button color="inherit" component={Link} to="/lands">Lands</Button>
        <Button color="inherit" component={Link} to="/users">Users</Button>
        <IconButton sx={{ ml: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
