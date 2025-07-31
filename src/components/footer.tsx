// src/components/Footer.tsx
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 4, bgcolor: 'primary.main', color: 'white' }}>
      <Container>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Gold Stream Academy. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="mailto:info@goldstreamacademy.com" color="inherit">
            info@goldstreamacademy.com
          </Link>{' '}
          | <Link href="/#contact" color="inherit">Contact Us</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;