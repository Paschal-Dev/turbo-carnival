import { useEffect, useState, type JSX } from 'react';
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { HistoryEdu, Favorite, School, SportsSoccer } from '@mui/icons-material';

export default function About() {
  const [deviceType, setDeviceType] = useState('mobile');
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (mobile) setDeviceType('mobile');
    else if (tablet) setDeviceType('tablet');
    else setDeviceType('pc');
  }, [mobile, tablet]);

  const menuItems = ['Our History', 'Our Values', 'Our Mission', 'Sports and Extracurriculars'];
  type MenuItem = (typeof menuItems)[number];

  const content: Record<MenuItem, JSX.Element> = {
    'Our History': (
      <>
        <Typography
          fontSize={deviceType === 'mobile' ? 24 : deviceType === 'tablet' ? 32 : 48}
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === 'mobile' ? 1 : 2}
        >
          <HistoryEdu sx={{ color: 'primary.main', fontSize: deviceType === 'mobile' ? 20 : 28 }} /> Our History
        </Typography>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0EnJmozD228XM_jgIgwtUJ_OTZLHfhM6UA&s"
          alt="Our History"
          style={{ width: '100%', height: deviceType === 'mobile' ? '150px' : 'auto', objectFit: 'cover' }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'text.secondary', lineHeight: 1.5, fontSize: deviceType === 'mobile' ? '0.9rem' : '1rem' }}
        >
          Founded in 2005, Gold Stream Academy began as a small community school with a vision to redefine education...
        </Typography>
      </>
    ),
    'Our Values': (
      <>
        <Typography
          fontSize={deviceType === 'mobile' ? 24 : deviceType === 'tablet' ? 32 : 48}
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === 'mobile' ? 1 : 2}
        >
          <Favorite sx={{ color: 'primary.main', fontSize: deviceType === 'mobile' ? 20 : 28 }} /> Our Values
        </Typography>
        <img
          src="https://townsquare.media/site/136/files/2025/04/attachment-GettyImages-2201558379.jpg?w=780&q=75"
          alt="Our Values"
          style={{ width: '100%', height: deviceType === 'mobile' ? '150px' : 'auto', objectFit: 'cover' }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'text.secondary', lineHeight: 1.5, fontSize: deviceType === 'mobile' ? '0.9rem' : '1rem' }}
        >
          Integrity, Excellence, and Community drive everything we do...
        </Typography>
      </>
    ),
    'Our Mission': (
      <>
        <Typography
          fontSize={deviceType === 'mobile' ? 24 : deviceType === 'tablet' ? 32 : 48}
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === 'mobile' ? 1 : 2}
        >
          <School sx={{ color: 'primary.main', fontSize: deviceType === 'mobile' ? 20 : 28 }} /> Our Mission
        </Typography>
        <img
          src="https://media.istockphoto.com/id/1318462880/photo/boy-typing-keyboard-for-programming-robot-kit.jpg?s=612x612&w=0&k=20&c=4KDYJtLwLqvZrMAofDJM_7JdtYWi2TuuYEw7qOX7--s="
          alt="Our Mission"
          style={{ width: '100%', height: deviceType === 'mobile' ? '150px' : 'auto', objectFit: 'cover' }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'text.secondary', lineHeight: 1.5, fontSize: deviceType === 'mobile' ? '0.9rem' : '1rem' }}
        >
          To inspire and empower students to achieve academic and personal success...
        </Typography>
      </>
    ),
    'Sports and Extracurriculars': (
      <>
        <Typography
          fontSize={deviceType === 'mobile' ? 24 : deviceType === 'tablet' ? 32 : 48}
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === 'mobile' ? 1 : 2}
        >
          <SportsSoccer sx={{ color: 'primary.main', fontSize: deviceType === 'mobile' ? 20 : 28 }} /> Sports and Extracurriculars
        </Typography>
        <img
          src="https://media.istockphoto.com/id/1412026365/photo/junior-level-basketball-player-bouncing-basketball-young-basketball-player-with-classic-ball.jpg?s=612x612&w=0&k=20&c=Hhb_c1Df2-wS1Rw-0WJa8MA7iQOmJIiuoecHu9_SC_M="
          alt="Sports and Extracurriculars"
          style={{ width: '100%', height: deviceType === 'mobile' ? '150px' : 'auto', objectFit: 'cover' }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{ color: 'text.secondary', lineHeight: 1.5, fontSize: deviceType === 'mobile' ? '0.9rem' : '1rem' }}
        >
          We believe sports and extracurriculars build teamwork, discipline, and resilience...
        </Typography>
      </>
    ),
  };

  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  useEffect(() => {
    if (deviceType === 'mobile') {
      const interval = setInterval(() => {
        setSelectedItem((prevItem) => {
          const currentIndex = menuItems.indexOf(prevItem);
          return menuItems[(currentIndex + 1) % menuItems.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType]);

  const styles = {
    backgroundColor: 'background.paper',
    color: 'primary.main',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: 'primary.main',
    p: deviceType === 'mobile' ? 2 : 6,
    width: deviceType === 'mobile' ? '100%' : '90%',
  };

  const poem = `
    IN THE BIRTHPLACE OF GODS, WE SOJOURN
    OF CHARACTER, VIRTUE AND DOMINION, ONLY EAGLES DARE
    MOUNTAINS ABOUND, BUT VICTORY, SAVOUR OF THE BRAVE
    REFINED FOR GREATNESS, STAND FAST, FOR YE ARE GODS
  `;

  return (
    <Box bgcolor="background.default" color="text.primary" pb={5} pt={5} id="about">
      <Container disableGutters={deviceType === 'mobile' || deviceType === 'tablet'}>
        <Box textAlign="center" px={deviceType === 'mobile' ? 0 : 2}>
          <Typography
            variant="h2"
            fontSize={deviceType === 'mobile' ? 24 : deviceType === 'tablet' ? 32 : 48}
            fontWeight={900}
            color="primary.main"
            mt={deviceType === 'mobile' ? 4 : 4}
            paddingBottom={deviceType === 'mobile' ? 1 : 2}
          >
            About Us
          </Typography>
          <hr style={{ width: deviceType === 'mobile' ? '30%' : '20%', border: '1px solid', borderColor: 'primary.main' }} />
        </Box>
      </Container>
      <Box
        sx={{
          display: 'flex',
          mt: deviceType === 'mobile' ? 2 : 6,
          p: deviceType === 'mobile' ? 1 : 5,
          bgcolor: 'background.paper',
          flexDirection: deviceType === 'mobile' ? 'column' : 'row',
        }}
      >
        <Box sx={{ display: deviceType === 'mobile' ? 'none' : 'block', width: '33.33%', pr: 2, bgcolor: 'background.paper' }}>
          <Box component="ul" sx={{ listStyleType: 'none', padding: 0, position: 'relative' }}>
            {menuItems.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: 2,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: selectedItem === item ? 'primary.main' : 'text.primary',
                    marginRight: 1,
                  },
                  '&:hover::before': { backgroundColor: 'secondary.main' },
                  '&:not(:last-child)::after': {
                    content: '""',
                    position: 'absolute',
                    left: '5px',
                    top: '50%',
                    width: '2px',
                    height: 'calc(100% - 20px)',
                    backgroundColor: 'text.primary',
                    zIndex: -1,
                  },
                  '&:hover::after': { backgroundColor: 'secondary.main' },
                }}
                onClick={() => setSelectedItem(item)}
              >
                <Typography
                  variant="body1"
                  fontSize={deviceType === 'mobile' ? 16 : 24}
                  borderRadius="5px"
                  p={1}
                  fontWeight={selectedItem === item ? 800 : 400}
                  color={selectedItem === item ? 'primary.main' : 'text.primary'}
                  sx={{
                    position: 'relative',
                    transition: 'border 0.3s ease',
                    border: selectedItem === item ? '1px solid' : 'none',
                    borderColor: 'primary.main',
                    '&:hover': { border: '1px solid', borderColor: 'secondary.main', fontWeight: 800 },
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
            <Box sx={{ position: 'absolute', top: 0, left: '10px', width: '2px', height: '100%', backgroundColor: 'text.primary', zIndex: -1 }} />
          </Box>
        </Box>
        <Box sx={{ width: deviceType === 'mobile' ? '100%' : '66.66%' }}>
          <Box sx={styles}>{content[selectedItem]}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: deviceType === 'mobile' ? 2 : 4,
          p: deviceType === 'mobile' ? 2 : 4,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: 'primary.main',
          width: deviceType === 'mobile' ? '100%' : '90%',
          mx: 'auto',
        }}
      >
        <Typography
          variant="body1"
          color="primary.main"
          fontSize={deviceType === 'mobile' ? 14 : deviceType === 'tablet' ? 18 : 24}
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            position: 'relative',
            '&:before, &:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              width: '20%',
              height: '2px',
              background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="200"><path d="M10 0 L10 200" fill="none" stroke="%23${theme.palette.primary.main.slice(1)}" stroke-width="2"/></svg>') no-repeat center`,
              transform: 'translateY(-50%)',
            },
            '&:before': { left: 0 },
            '&:after': { right: 0 },
          }}
          dangerouslySetInnerHTML={{ __html: poem.replace(/\n/g, '<br />') }}
        />
      </Box>
    </Box>
  );
}