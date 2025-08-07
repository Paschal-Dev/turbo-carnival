import { useState } from 'react';
import { Typography, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import YouTube from 'react-youtube';

const YouTubeFeed = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [videoId] = useState('8z5Sjsj2l0Y'); // Video of kids in soccer training

  const opts = {
    height: mobile ? '200' : '390',
    width: '100%',
    playerVars: {
      autoplay: 0, // Disable autoplay for school-safe usage
      controls: 1, // Show player controls
      modestbranding: 1, // Minimize YouTube branding
      rel: 0, // Disable related videos at the end
    },
  };

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.default' }} id="youtube">
      <Container>
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 4 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: 'primary.main',
            fontSize: mobile ? '1.5rem' : '2.5rem',
          }}
        >
          Our YouTube Channel
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            maxWidth: mobile ? '100%' : 800,
            mx: 'auto',
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <YouTube videoId={videoId} opts={opts} />
        </Box>
      </Container>
    </Box>
  );
};

export default YouTubeFeed;