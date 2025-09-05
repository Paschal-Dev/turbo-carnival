import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { keyframes } from '@mui/system';
import logo from '../assets/images/gsa_logo.png';

// CSS keyframes for animations
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const widthGrow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const GoldStreamFoundation = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Replace with your actual logo path

  return (
    <Box
      sx={{
        py: mobile ? 6 : 10,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(178, 34, 34, 0.15) 0%, transparent 50%)',
          zIndex: 1,
        }
      }}
      id="foundation"
    >
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: mobile ? 4 : 6,
            fontSize: mobile ? '1.8rem' : tablet ? '2.2rem' : '2.8rem',
            fontWeight: 900,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Information about Gold Stream Foundation
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: mobile ? 4 : 6
          }}
        >
          {/* Logo Box with Animation */}
          <Box
            sx={{
              flex: mobile ? '0 0 100%' : '0 0 40%',
              display: 'flex',
              justifyContent: 'center',
              animation: isVisible ? `${fadeInLeft} 0.8s ease-out forwards` : 'none',
              opacity: 0
            }}
          >
            <Box
              sx={{
                p: mobile ? 2 : 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(178, 34, 34, 0.3)',
                border: '1px solid',
                borderColor: 'rgba(178, 34, 34, 0.3)',
                backdropFilter: 'blur(10px)',
                maxWidth: mobile ? '250px' : '400px',
                width: '100%',
                mx: 'auto',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  animation: isVisible ? `${scaleIn} 0.6s ease-out 0.3s forwards` : 'none',
                  opacity: 0
                }}
              >
                <img
                  src={logo}
                  alt="Gold Stream Foundation Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Text Box with Animation */}
          <Box
            sx={{
              flex: mobile ? '0 0 100%' : '0 0 55%',
              animation: isVisible ? `${fadeInRight} 0.8s ease-out 0.2s forwards` : 'none',
              opacity: 0
            }}
          >
            <Box
              sx={{
                p: mobile ? 3 : 4,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: mobile ? '1rem' : '1.1rem',
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: mobile ? 'center' : 'left',
                  '&::first-letter': {
                    fontSize: '1.5em',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    float: 'left',
                    lineHeight: 1,
                    mr: 1
                  }
                }}
              >
                We visit orphanages and vulnerable communities, identify talents and then set up training infrastructure and equipment, as well as human resources (coaches, counsellors and mentors) towards the training of the discovered assets....
              </Typography>
              
              <Box
                sx={{
                  height: '2px',
                  backgroundColor: theme.palette.primary.main,
                  marginTop: '24px',
                  borderRadius: '2px',
                  animation: isVisible ? `${widthGrow} 1s ease-out 0.8s forwards` : 'none',
                  width: 0
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Animated decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(178, 34, 34, 0.4) 0%, transparent 70%)',
            zIndex: 1,
            opacity: 0,
            animation: isVisible ? 'fadeIn 1s ease-out 1s forwards' : 'none',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 0.3 }
            }
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 160, 23, 0.3) 0%, transparent 70%)',
            zIndex: 1,
            opacity: 0,
            animation: isVisible ? 'fadeInSlow 1s ease-out 1.2s forwards' : 'none',
            '@keyframes fadeInSlow': {
              from: { opacity: 0 },
              to: { opacity: 0.2 }
            }
          }}
        />
      </Container>
    </Box>
  );
};

export default GoldStreamFoundation;