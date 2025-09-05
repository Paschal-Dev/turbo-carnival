import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B22222', // Gold
      contrastText: '#000000', // Black for contrast
    },
    secondary: {
      main: '#B22222', // Red
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Light gray
      paper: '#FFFFFF', // White for cards
    },
    text: {
      primary: '#000000', // Black
      secondary: '#4A4A4A', // Dark gray
    },
    error: {
      main: '#B22222', // Red for errors
    },
    warning: {
      main: '#FF9800', // Orange for ongoing events
    },
    info: {
      main: '#2196F3', // Blue for upcoming events
    },
    success: {
      main: '#4CAF50', // Green for completed events
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h1: { fontWeight: 700, color: '#B22222' },
    h2: { fontWeight: 700, color: '#B22222' },
    h3: { fontWeight: 600, color: '#B22222' },
    h4: { fontWeight: 600, color: '#B22222' },
    body1: { fontSize: '1rem', color: '#000000' },
    body2: { fontSize: '0.9rem', color: '#4A4A4A' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            backgroundColor: '#B22222', // Red on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid #D4A017', // Gold border
        },
      },
    },
  },
});

export default theme;