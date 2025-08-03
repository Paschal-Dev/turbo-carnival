import { Box, Typography, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import heroBg from '../assets/images/hero_bg.png';

const Hero = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box
      sx={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: mobile ? '50vh' : '80vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Container>
        <Typography variant="h1" gutterBottom sx={{ fontSize: mobile ? '2rem' : '3rem' }}>
          Welcome to Gold Stream Academy
        </Typography>
        <Typography variant="h5" sx={{ mb: mobile ? 2 : 3, fontSize: mobile ? '1rem' : '1.5rem' }}>
          Empowering the next generation with quality education
        </Typography>
        <Button variant="contained" color="primary" size={mobile ? "small" : "large"}>
          Enroll Now
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;