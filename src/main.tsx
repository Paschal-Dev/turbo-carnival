import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import logo from './assets/images/logo.png';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components
const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate 2s loading
    return () => clearTimeout(timer);
  }, []);

  return (
    loading ? (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #1976d2, #0d47a1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000, // Higher than advertisement overlay
          color: '#fff',
        }}
      >
        <img
          src={logo}
          alt="Loading..."
          style={{
            width: '100px',
            height: '100px',
            animation: 'spin 1s linear infinite',
          }}
        />
        <Typography variant="h4" sx={{ mt: 2, animation: 'fadeIn 1s infinite alternate' }}>
          Gold Stream Academy
        </Typography>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
              from { opacity: 0.5; }
              to { opacity: 1; }
            }
          `}
        </style>
      </Box>
    ) : null
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Preloader />
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}