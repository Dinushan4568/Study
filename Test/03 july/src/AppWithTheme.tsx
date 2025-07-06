import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton, useMediaQuery, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const AppWithTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#9c27b0' },
    },
    shape: { borderRadius: 12 },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 2000 }}>
        <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      {children}
    </ThemeProvider>
  );
};

export default AppWithTheme;