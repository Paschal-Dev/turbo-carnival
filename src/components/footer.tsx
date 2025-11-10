import { Box, Container, Typography, Link, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box sx={{ py: mobile ? 2 : 4, bgcolor: 'primary.main', color: 'white' }}>
      <Container>
        <Typography color='#fff' variant="body2" align="center" sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}>
          © {new Date().getFullYear()} Gold Stream Academy. All rights reserved.
        </Typography>
        <Typography color='#fff' variant="body2" align="center" sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}>
          <Link href="mailto:info@goldstreamacademy.com" color="#fff">info@goldstreamacademy.com</Link>{' '}
          | <Link href="/#contact" color="#fff">Contact Us</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;