import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import heroImage from '../assets/images/hero_bg.png';

const Hero = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box
      sx={{
        height: mobile ? '60vh' : '100vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: mobile ? '2rem' : '4rem',
            fontWeight: 900,
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Welcome to Gold Stream Academy
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: mobile ? '1rem' : '1.5rem',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          Empowering Young Minds Through Education and Sports
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ fontSize: mobile ? '0.9rem' : '1rem', px: mobile ? 3 : 4 }}
          component="a"
          href="#contact"
        >
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
};

export default Hero;