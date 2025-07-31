// src/components/Hero.tsx
import { Box, Typography, Button, Container } from '@mui/material';
import heroBg from '../assets/images/hero_bg.png'; // Replace with actual background image

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Container>
        <Typography variant="h1" gutterBottom>
          Welcome to Gold Stream Academy
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Empowering the next generation with quality education
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Enroll Now
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;