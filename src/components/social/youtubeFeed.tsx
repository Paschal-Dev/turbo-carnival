import { useState, type SetStateAction } from 'react';
import { Typography, Box, Container, useTheme, useMediaQuery, Button, IconButton } from '@mui/material';
import YouTube from 'react-youtube';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const YouTubeFeed = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Sample video IDs - replace with your actual video IDs
  const videoIds = [
    '8z5Sjsj2l0Y', // Video of kids in soccer training
    'dQw4w9WgXcQ', // Example video 1
    'jNQXAC9IVRw', // Example video 2
    '8UVNT4wvIGY', // Example video 3
    '9bZkp7q19f0', // Example video 4
  ];

  // const videoTitles = [
  //   "Soccer Training Session",
  //   "School Science Fair 2023",
  //   "Annual Music Concert",
  //   "Basketball Championship",
  //   "Art Exhibition Tour"
  // ];

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

  const handleSeeMoreClick = () => {
    window.open('https://www.youtube.com/@YourSchoolChannel', '_blank'); // Replace with your YouTube channel/playlist URL
  };

  const handleNextVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === videoIds.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevVideo = () => {
    setSelectedVideoIndex((prevIndex) => 
      prevIndex === 0 ? videoIds.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: SetStateAction<number>) => {
    setSelectedVideoIndex(index);
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
        
        {/* Main Video Player */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            maxWidth: mobile ? '100%' : 800,
            mx: 'auto',
            border: '1px solid',
            borderColor: 'primary.main',
            mb: 4,
          }}
        >
          <YouTube videoId={videoIds[selectedVideoIndex]} opts={opts} />
          {/* <Typography
            variant="h6"
            align="center"
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {videoTitles[selectedVideoIndex]}
          </Typography> */}
        </Box>

        {/* Video Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <IconButton 
            onClick={handlePrevVideo}
            sx={{ 
              color: 'primary.main',
              '&:hover': { backgroundColor: 'primary.main', color: 'white' }
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          
          <Box sx={{ mx: 2, display: 'flex', overflowX: 'auto', py: 2 }}>
            {videoIds.map((id, index) => (
              <Box
                key={id}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  minWidth: mobile ? 80 : 120,
                  height: mobile ? 60 : 90,
                  mx: 1,
                  cursor: 'pointer',
                  border: selectedVideoIndex === index ? '3px solid' : '1px solid',
                  borderColor: selectedVideoIndex === index ? 'secondary.main' : 'grey.300',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  opacity: selectedVideoIndex === index ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {selectedVideoIndex === index && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: 'secondary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: 0,
                          height: 0,
                          borderTop: '6px solid transparent',
                          borderLeft: '12px solid white',
                          borderBottom: '6px solid transparent',
                          ml: '2px'
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <IconButton 
            onClick={handleNextVideo}
            sx={{ 
              color: 'primary.main',
              '&:hover': { backgroundColor: 'primary.main', color: 'white' }
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              px: 4,
              fontWeight: 'bold',
              borderColor: 'secondary.main',
              fontSize: mobile ? '0.9rem' : '1rem',
              color: '#000',
            }}
            onClick={handleSeeMoreClick}
          >
            See More Videos
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default YouTubeFeed;