import { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link, type LinkProps } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from '../assets/images/gsa_logo.png';

// Define a custom component type for ListItem with Link
const CustomLinkComponent = (props: LinkProps) => <Link {...props} />;

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (mobile) setDrawerOpen(false); // Close drawer on mobile after click
  };

  const navLinks = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '#about' },
    { text: 'Programs', to: '#programs' },
    { text: 'Testimonials', to: '#testimonials' },
    { text: 'Contact', to: '#contact' },
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
              <IconButton edge="end" color="primary" onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ '& .MuiDrawer-paper': { width: '250px', backgroundColor: '#ffffff' } }}
              >
                <List>
                  {navLinks.map((link) => (
                    <ListItem
                      key={link.text}
                      component={CustomLinkComponent}
                      to={link.to}
                      onClick={() => handleLinkClick(link.text.toLowerCase())}
                      sx={{
                        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                        ...(activeLink === link.text.toLowerCase() && {
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                          '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.3)' },
                        }),
                      }}
                    >
                      <ListItemText
                        primary={link.text}
                        primaryTypographyProps={{
                          color: activeLink === link.text.toLowerCase() ? '#1976d2' : '#333333',
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
                  component={Link}
                  to={link.to}
                  onClick={() => handleLinkClick(link.text.toLowerCase())}
                  sx={{
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderBottom: '1px solid', borderColor: 'primary.main', opacity: 0.8 },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: activeLink === link.text.toLowerCase() ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'primary.main',
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