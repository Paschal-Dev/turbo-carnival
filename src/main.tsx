import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import logo from './assets/images/logo.png';
import { Box, Typography } from '@mui/material';

// ✅ Redux imports
import { Provider } from 'react-redux';
import { store } from './store';

// ✅ Preloader component
// eslint-disable-next-line react-refresh/only-export-components
const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #B22222, #8B0000)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
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
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          animation: 'fadeIn 1s infinite alternate',
          fontWeight: 600,
        }}
      >
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
  );
};

// ✅ Root rendering
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      {/* Redux provider wraps the whole app */}
      <Provider store={store}>
        <Preloader />
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
