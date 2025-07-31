// src/components/Contact.tsx
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import type { FormEvent } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'secondary.main',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="contact"
    >
      {/* Subtle Background Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(25, 118, 210, 0.05)', // Light blue overlay
          zIndex: 0,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            mt: 8,
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto', color: 'text.secondary', lineHeight: 1.6 }}
        >
          Have questions or want to learn more about Gold Stream Academy? Reach out to us, and our team will respond promptly to assist you!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 4,
          }}
        >
          {/* Contact Form */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: '1px solid',
              borderColor: 'primary.light',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}
            >
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={5}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Send Message
              </Button>
            </form>
          </Paper>

          {/* Contact Information */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              border: '1px solid',
              borderColor: 'primary.light',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}
            >
              Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
              <Typography variant="body1">
                Email:{' '}
                <a
                  href="mailto:info@goldstreamacademy.com"
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                  onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                  info@goldstreamacademy.com
                </a>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
              <Typography variant="body1">
                Phone:{' '}
                <a
                  href="tel:+1234567890"
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                  onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                  +234 706 995 5905
                </a>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
              <Typography variant="body1">
                Address: 123 Education Lane, Learning City, LC 12345
              </Typography>
            </Box>
            <Divider sx={{ my: 3, bgcolor: 'primary.light' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Our team is available Monday through Friday, 9 AM to 5 PM. We look forward to answering your questions and helping you explore how Gold Stream Academy can support your child’s education.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;