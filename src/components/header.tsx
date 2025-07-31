// src/components/Header.tsx
import { useState } from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/gsa_logo.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Container>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
          }}
        >
          <img
            src={logo}
            alt="Gold Stream Academy"
            style={{ height: '70px' }}
          />
          <div>
            <Button
              color="primary"
              component={Link}
              to="/"
              onClick={() => handleLinkClick('home')}
              sx={{
                position: 'relative', // For pseudo-element positioning
                transition: 'all 0.3s ease', // Smooth transition for hover
                '&:hover': {
                  borderBottom: '1px solid',
                  borderColor: 'primary.main',
                  opacity: 0.8,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === 'home' ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'primary.main', // Blue #1976d2
                  transition: 'width 0.3s ease-in-out', // Sliding animation
                },
              }}
            >
              Home
            </Button>
            <Button
              color="primary"
              component={Link}
              to="#about"
              onClick={() => handleLinkClick('about')}
              sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderBottom: '1px solid',
                  borderColor: 'primary.main',
                  opacity: 0.8,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === 'about' ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s ease-in-out',
                },
              }}
            >
              About
            </Button>
            <Button
              color="primary"
              component={Link}
              to="#programs"
              onClick={() => handleLinkClick('programs')}
              sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderBottom: '1px solid',
                  borderColor: 'primary.main',
                  opacity: 0.8,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === 'programs' ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s ease-in-out',
                },
              }}
            >
              Programs
            </Button>
            <Button
              color="primary"
              component={Link}
              to="#testimonials"
              onClick={() => handleLinkClick('testimonials')}
              sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderBottom: '1px solid',
                  borderColor: 'primary.main',
                  opacity: 0.8,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === 'testimonials' ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s ease-in-out',
                },
              }}
            >
              Testimonials
            </Button>
            <Button
              color="primary"
              component={Link}
              to="#contact"
              onClick={() => handleLinkClick('contact')}
              sx={{
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderBottom: '1px solid',
                  borderColor: 'primary.main',
                  opacity: 0.8,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === 'contact' ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s ease-in-out',
                },
              }}
            >
              Contact
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;