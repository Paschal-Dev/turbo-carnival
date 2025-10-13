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
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: mobile ? '2.5rem' : '3.5rem',
              fontWeight: 600,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            WELCOME TO
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: mobile ? '2.5rem' : '3.5rem',
              fontWeight: 900,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.1,
            }}
          >
            GOLD STREAM ACADEMY
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: mobile ? '1rem' : '1.5rem',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            fontStyle: 'italic',
          }}
        >
          Cutting edge talent refinement from grassroots to greatness.
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