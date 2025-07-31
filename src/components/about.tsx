// src/components/About.tsx
import { Box, Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'secondary.main' }} id="about">
      <Container>
        <Typography mt={8} variant="h2" align="center" gutterBottom>
          About Gold Stream Academy
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Gold Stream Academy, we are committed to fostering academic excellence, leadership, and personal growth. Our holistic approach ensures students thrive in a supportive environment that nurtures their intellectual, emotional, and physical development.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Our History
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2005, Gold Stream Academy has grown from a small community school to a leading institution recognized for its innovative curriculum and dedication to student success. Our alumni have excelled in academics, sports, and leadership roles worldwide.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Sports and Extracurriculars
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in the power of sports to build teamwork, discipline, and resilience. Our state-of-the-art facilities support a wide range of activities, including soccer, basketball, track and field, and more, ensuring every student finds their passion.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph>
              Integrity, excellence, and inclusivity guide everything we do. We celebrate diversity, encourage curiosity, and empower students to become confident, compassionate leaders who make a positive impact in their communities.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              maxWidth: { md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Placeholder sports vector
              alt="Sports at Gold Stream Academy"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;