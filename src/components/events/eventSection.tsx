import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
  keyframes
} from '@mui/material';
import {
  CalendarMonth,
  // SportsSoccer,
  // School,
  // MusicNote,
  // Science,
  CheckCircle,
  EventAvailable,
  EventBusy,
  Close
} from '@mui/icons-material';
import { events, type Event } from '../../data/events';
import RegistrationForm from '../../data/register';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const loadingAnimation = keyframes`
  0% { content: "."; }
  33% { content: ".."; }
  66% { content: "..."; }
  100% { content: "."; }
`;

const EventsSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [eventList] = useState<Event[]>(events);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // For image preview
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
    setSelectedImage(null);
  };

  const handleRegisterClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setRegistrationOpen(true);
  };

 const { eventId } = useParams();
const navigate = useNavigate();

// Automatically open registration form if URL has /register/:eventId
useEffect(() => {
  if (eventId) {
    setSelectedEventId(eventId);
    setRegistrationOpen(true);
  }
}, [eventId]);

// When dialog closes, navigate back to main page
const handleCloseRegistration = () => {
  setRegistrationOpen(false);
  setSelectedEventId(null);
  navigate('/'); // or '/events' if you prefer
};


  const getStatusChip = (status: string) => {
    switch (status) {
      case 'completed':
        return <Chip icon={<CheckCircle />} label="Completed" color="success" size="small" />;
      case 'ongoing':
        return <Chip icon={<EventAvailable />} label="Happening Now" color="warning" size="small" />;
      case 'upcoming':
        return <Chip icon={<EventBusy />} label="Coming Soon" color="info" size="small" />;
      default:
        return null;
    }
  };

  // const getIcon = (category: string) => {
  //   switch (category) {
  //     case 'Sports':
  //       return <SportsSoccer fontSize={mobile ? 'medium' : 'large'} color="primary" />;
  //     case 'Science':
  //       return <Science fontSize={mobile ? 'medium' : 'large'} color="primary" />;
  //     case 'Music':
  //       return <MusicNote fontSize={mobile ? 'medium' : 'large'} color="primary" />;
  //     case 'School':
  //       return <School fontSize={mobile ? 'medium' : 'large'} color="primary" />;
  //     default:
  //       return <CalendarMonth fontSize={mobile ? 'medium' : 'large'} color="primary" />;
  //   }
  // };

  const reorderedEvents = [
    eventList.find((e) => e.title.toLowerCase().includes('olympiad'))!,
    ...eventList.filter((e) => !e.title.toLowerCase().includes('olympiad')),
  ];

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.paper' }} id="events">
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
          School Events
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: mobile ? 2 : 4,
            justifyItems: 'center',
            alignItems: 'stretch',
          }}
        >
          {reorderedEvents.map((event, index) => {
            const isOlympiad = event.title.toLowerCase().includes('olympiad');
            const isRed = index === 2 || index === 3 || index === 5;
            // const isBlack = index === 1 || index === 4;

            if (!isOlympiad) {
              return (
                <Box key={event.id} sx={{ maxWidth: '400px', width: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      backgroundColor: isRed ? '#b71c1c' : '#000',
                      color: 'white',
                      boxShadow: 3,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        position: 'relative',
                        fontSize: '1.4rem',
                        letterSpacing: '2px',
                        '::after': {
                          display: 'inline-block',
                          animation: `${loadingAnimation} 1.5s infinite`,
                          content: '"."',
                        },
                      }}
                    >
                      updating
                    </Typography>
                  </Card>
                </Box>
              );
            }

            // Olympiad card
            return (
              <Box key={event.id} sx={{ maxWidth: '400px', width: '100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: `4px solid ${
                      event.status === 'completed'
                        ? '#4CAF50'
                        : event.status === 'ongoing'
                        ? '#FF9800'
                        : '#2196F3'
                    }`,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={event.image}
                    alt="Olympiad Banner"
                    sx={{
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(event.image)}
                  />
                  <CardContent sx={{ flexGrow: 1, p: mobile ? 2 : 3 }}>
                    {/* Hide title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: mobile ? 1 : 2 }}>
                      {getStatusChip(event.status)}
                    </Box>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: mobile ? 1 : 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: mobile ? '0.9rem' : '1rem',
                      }}
                    >
                      <CalendarMonth sx={{ mr: 1, fontSize: mobile ? '0.9rem' : '1rem' }} />
                      {event.date}
                      {event.status === 'ongoing' && (
                        <Chip label="Live Now" color="error" size="small" sx={{ ml: 2 }} />
                      )}
                    </Typography>

                    <Typography
                      paragraph
                      sx={{
                        mb: mobile ? 1 : 2,
                        fontSize: mobile ? '0.9rem' : '1rem',
                      }}
                    >
                      {event.description}
                    </Typography>

                    {event.highlights && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: 'italic',
                          color: 'success.main',
                          mb: mobile ? 1 : 2,
                          fontSize: mobile ? '0.8rem' : '0.9rem',
                        }}
                      >
                        🏆 {event.highlights}
                      </Typography>
                    )}
                  </CardContent>

                  <Box
                    sx={{
                      p: mobile ? 1 : 2,
                      pt: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      variant={event.status === 'upcoming' ? 'contained' : 'outlined'}
                      color="primary"
                      disabled={event.status === 'completed'}
                      onClick={() => {
  if (event.status !== 'completed') {
    window.history.pushState({}, '', `/register/${event.id}`);
    handleRegisterClick(event.id);
  }
}}

                      sx={{
                        textTransform: 'none',
                        fontSize: mobile ? '0.8rem' : '0.9rem',
                        bgcolor: event.status === 'upcoming' ? 'secondary.main' : undefined,
                      }}
                    >
                      {event.status === 'completed'
                        ? 'View Photos'
                        : event.status === 'ongoing'
                        ? 'Join Now'
                        : 'Register'}
                    </Button>
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Full Image Dialog */}
        <Dialog open={openImage} onClose={handleCloseImage} maxWidth="lg">
          <DialogContent sx={{ position: 'relative', p: 0 }}>
            <IconButton
              onClick={handleCloseImage}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.4)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
              }}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={selectedImage || ''}
              alt="Full View"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Registration Form Dialog */}
        <RegistrationForm
          open={registrationOpen}
          onClose={handleCloseRegistration}
          eventId={selectedEventId}
        />
      </Container>
    </Box>
  );
};

export default EventsSection;
