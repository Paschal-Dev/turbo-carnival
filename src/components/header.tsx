import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  useTheme, 
  useMediaQuery,
  Box,
  Typography,
  SwipeableDrawer,
  keyframes
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: 'Home', to: 'home' },
    { text: 'About', to: 'about' },
    { text: 'Programs', to: 'programs' },
    { text: 'Events', to: 'events' },
    { text: 'News', to: 'blog' },
    { text: 'Videos', to: 'youtube' },
    { text: 'Milestones', to: 'milestones' },
    { text: 'Testimonials', to: 'testimonials' },
    { text: 'Contact', to: 'contact' },
  ];

  const categoryLinks = [
    { text: 'SPORTS', to: 'sports' },
    { text: 'ARTS', to: 'arts' },
    { text: 'APPLIED SCIENCE', to: 'applied-science' },
    { text: 'ACADEMICS', to: 'academics' },
  ];

  // Animation for the menu icon
  const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(178, 34, 34, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(178, 34, 34, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(178, 34, 34, 0);
    }
  `;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        transition: 'background-color 0.3s ease',
        ...(scrolled && {
          backgroundColor: 'background.paper',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',   // Align logo & categories at bottom
          py: 1,
          minHeight: { xs: '70px', md: '90px' } 
        }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <img 
              src={logo} 
              alt="Gold Stream Academy" 
              style={{ 
                height: mobile ? '70px' : '150px', // Bigger logo
                marginRight: mobile ? '10px' : '30px'
              }} 
            />
          </Box>

          {/* Right section with categories and menu */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* Category Links - only show when scrolled */}
            <Box sx={{ 
              display: scrolled ? { xs: 'none', md: 'flex' } : 'none', 
              gap: { md: 4, lg: 6 },
              mr: 2,
              transition: 'opacity 0.3s ease',
              opacity: scrolled ? 1 : 0
            }}>
              {categoryLinks.map((link) => (
                <Typography
                  key={link.text}
                  sx={{
                    fontSize: { md: '0.9rem', lg: '1rem' },
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'black',   // black text
                    cursor: 'default',
                  }}
                >
                  {link.text}
                </Typography>
              ))}
            </Box>

            {/* Hamburger menu button */}
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{
                color: scrolled ? 'black' : 'white',
                padding: '4px',
                animation: `${pulse} 2s infinite`,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Slide-in drawer for mobile */}
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            sx={{ 
              '& .MuiDrawer-paper': { 
                width: { xs: '100%', sm: '380px' },
                backgroundColor: 'background.paper',
                backgroundImage: 'none',
                padding: 2,
              } 
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Category links in drawer */}
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {categoryLinks.map((link) => (
                  <Typography
                    key={link.text}
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'text.primary',
                      py: 0.5,
                      px: 1.5,
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 1
                    }}
                  >
                    {link.text}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Navigation links */}
            <List sx={{ pt: 2 }}>
              {navLinks.map((link) => (
                <ListItem
                  key={link.text}
                  component={ScrollLink}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onClick={() => handleLinkClick(link.text.toLowerCase())}
                  sx={{
                    '&:hover': { backgroundColor: 'rgba(212, 160, 23, 0.1)' },
                    ...(activeLink === link.text.toLowerCase() && {
                      backgroundColor: 'rgba(212, 160, 23, 0.2)',
                      '&:hover': { backgroundColor: 'rgba(212, 160, 23, 0.3)' },
                    }),
                  }}
                >
                  <ListItemText
                    primary={link.text}
                    primaryTypographyProps={{
                      color: activeLink === link.text.toLowerCase() ? 'primary.main' : 'text.primary',
                      fontWeight: activeLink === link.text.toLowerCase() ? 700 : 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
