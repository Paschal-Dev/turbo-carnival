import { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from '../assets/images/gsa_logo.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (mobile) setDrawerOpen(false);
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

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)' }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <img src={logo} alt="Gold Stream Academy" style={{ height: mobile ? '50px' : '70px' }} />
          {mobile ? (
            <>
              <IconButton edge="end" color="primary" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ '& .MuiDrawer-paper': { width: '250px', backgroundColor: 'background.paper' } }}
              >
                <List>
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
              </Drawer>
            </>
          ) : (
            <div>
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  color="primary"
                  component={ScrollLink}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onClick={() => handleLinkClick(link.text.toLowerCase())}
                  sx={{
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    color: activeLink === link.text.toLowerCase() ? 'primary.main' : 'text.primary',
                    '&:hover': { borderBottom: '1px solid', borderColor: 'secondary.main' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: activeLink === link.text.toLowerCase() ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'secondary.main',
                      transition: 'width 0.3s ease-in-out',
                    },
                  }}
                >
                  {link.text}
                </Button>
              ))}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;