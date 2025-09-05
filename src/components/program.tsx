import { Box, Container, Typography, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import { School, SportsSoccer, Palette, Science } from '@mui/icons-material';

const Programs = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));

  const programs = [
    
    {
      title: 'SPORTS',
      description: 'From soccer to basketball, we foster teamwork and discipline...',
      icon: <SportsSoccer sx={{ fontSize: mobile ? 40 : 60, color: 'primary.main' }} />,
    },
    {
      title: 'ARTS',
      description: 'Explore creativity through music, art, and drama...',
      icon: <Palette sx={{ fontSize: mobile ? 40 : 60, color: 'primary.main' }} />,
    },
    {
      title: 'APPLIED SCIENCE',
      description: 'Hands-on science and technology programs...',
      icon: <Science sx={{ fontSize: mobile ? 40 : 60, color: 'primary.main' }} />,
    },
    {
      title: 'ACADEMICS',
      description: 'Our curriculum emphasizes critical thinking and innovation...',
      icon: <School sx={{ fontSize: mobile ? 40 : 60, color: 'primary.main' }} />,
    }
  ];

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.paper' }} id="programs">
      <Container>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          mt={mobile ? 4 : 4}
          sx={{ mb: mobile ? 4 : 6, color: 'primary.main', fontSize: mobile ? '1.5rem' : '2.5rem' }}
        >
          CO-CURRICULAR STREAMS 
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // 1 column on mobile
              sm: 'repeat(2, 1fr)', // 2 columns on small screens
              md: 'repeat(4, 1fr)', // 4 columns on medium and larger screens
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
            justifyItems: 'center', // Center cards horizontally
            alignItems: 'stretch', // Ensure cards are equal height
          }}
        >
          {programs.map((program, index) => (
            <Box key={index} sx={{ maxWidth: '300px', width: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: '12px',
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: mobile ? 2 : 3 }}>
                  <Box sx={{ mb: 2 }}>{program.icon}</Box>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    gutterBottom
                    sx={{ fontSize: mobile ? '1.2rem' : '1.5rem' }}
                  >
                    {program.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: mobile ? '0.9rem' : '1rem' }}
                  >
                    {program.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Programs;