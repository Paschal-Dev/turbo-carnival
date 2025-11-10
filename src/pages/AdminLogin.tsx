/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { postJson } from '../api';

const MySwal = withReactContent(Swal);

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Auto-redirect if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) navigate('/admin/dashboard');
  }, [navigate]);

// In AdminLogin.tsx
const submit = async () => {
  try {
    setLoading(true);
    
    // Use direct backend URL for login too
    const res = await fetch('http://localhost/goldstream-backend/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim()
      })
    });
    
    const text = await res.text();
    console.log('📄 Raw login response:', text);
    
    const data = JSON.parse(text);
    console.log('🔍 Parsed login data:', data);
    
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUsername', data.admin.username);
      
      MySwal.fire({
        icon: 'success',
        title: `Welcome, ${data.admin.username}`,
        text: 'Login successful!',
        timer: 1200,
        showConfirmButton: false,
      });

      navigate('/admin/dashboard');
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
        text: data.message || 'Login failed',
      });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    MySwal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Login failed. Please try again.',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background:
          'linear-gradient(135deg, #004aad 0%, #0073e6 100%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Admin Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPwd ? 'text' : 'password'}
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPwd((s) => !s)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={submit}
          disabled={loading}
          sx={{
            mt: 1,
            py: 1,
            backgroundColor: '#004aad',
            ':hover': { backgroundColor: '#003a8c' },
          }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Paper>
    </Box>
  );
}