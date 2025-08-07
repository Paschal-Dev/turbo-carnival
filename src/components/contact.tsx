import { useState } from 'react';
import { Typography, Box, Container, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import YouTube from 'react-youtube';

const Contact = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [videoId] = useState('8z5Sjsj2l0Y'); // Video of kids in soccer training

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const videoOpts = {
    height: mobile ? '200' : '390',
    width: '100%',
    playerVars: {
      autoplay: 0, // Disable autoplay for school-safe usage
      controls: 1, // Show player controls
      modestbranding: 1, // Minimize YouTube branding
      rel: 0, // Disable related videos at the end
    },
  };

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.default' }} id="contact">
      <Container>
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 4 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: 'primary.main',
            fontSize: mobile ? '1.5rem' : '2.5rem',
          }}
        >
          Get in Touch
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // 1 column on mobile
              md: 'repeat(2, 1fr)', // 2 columns on medium and larger
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
            alignItems: 'stretch', // Ensure sections are equal height
          }}
        >
          <Box sx={{ mb: mobile ? 2 : 4 }}>
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ mb: 2, fontSize: mobile ? '1.2rem' : '1.5rem' }}
            >
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body1" sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}>
                info@goldstreamacademy.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body1" sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}>
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body1" sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}>
                123 Gold Stream Ave, City, Country
              </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: 'secondary.main',
                fontSize: mobile ? '0.9rem' : '1rem',
                borderRadius: '8px',
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: mobile ? 4 : 6 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              mb: mobile ? 4 : 6,
              color: 'primary.main',
              fontSize: mobile ? '1.5rem' : '2.5rem',
            }}
          >
            See Our Students in Action
          </Typography>
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              maxWidth: mobile ? '100%' : 800,
              mx: 'auto',
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            <YouTube videoId={videoId} opts={videoOpts} />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: 'center', fontSize: mobile ? '0.9rem' : '1rem' }}
          >
            Watch our students during a soccer training session!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;