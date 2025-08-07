import { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Chip, useTheme, useMediaQuery } from '@mui/material';
import { CalendarMonth, SportsSoccer, School, MusicNote, Science, CheckCircle, EventAvailable, EventBusy } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { events, type Event } from '../../data/events';

const EventsSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [eventList] = useState<Event[]>(events);

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

  const getIcon = (category: string) => {
    switch (category) {
      case 'Sports':
        return <SportsSoccer fontSize={mobile ? 'medium' : 'large'} color="primary" />;
      case 'Science':
        return <Science fontSize={mobile ? 'medium' : 'large'} color="primary" />;
      case 'Music':
        return <MusicNote fontSize={mobile ? 'medium' : 'large'} color="primary" />;
      case 'School':
        return <School fontSize={mobile ? 'medium' : 'large'} color="primary" />;
      default:
        return <CalendarMonth fontSize={mobile ? 'medium' : 'large'} color="primary" />;
    }
  };

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
              xs: '1fr', // 1 column on mobile
              md: 'repeat(2, 1fr)', // 2 columns on medium
              lg: 'repeat(3, 1fr)', // 3 columns on large
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
            justifyItems: 'center', // Center cards horizontally
            alignItems: 'stretch', // Ensure cards are equal height
          }}
        >
          {eventList.map((event) => (
            <Box key={event.id} sx={{ maxWidth: '400px', width: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: `4px solid ${
                    event.status === 'completed' ? '#4CAF50' : event.status === 'ongoing' ? '#FF9800' : '#2196F3'
                  }`,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 },
                  borderRadius: '12px',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x140?text=Image+Not+Found';
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: mobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: mobile ? 1 : 2 }}>
                    {getIcon(event.category)}
                    <Typography
                      variant="h5"
                      sx={{
                        ml: 1.5,
                        flexGrow: 1,
                        fontSize: mobile ? '1.2rem' : '1.5rem',
                        color: 'primary.main',
                      }}
                    >
                      {event.title}
                    </Typography>
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
                  <Typography paragraph sx={{ mb: mobile ? 1 : 2, fontSize: mobile ? '0.9rem' : '1rem' }}>
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
                  {(event.deadline || event.registration || event.call) && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        fontSize: mobile ? '0.8rem' : '0.9rem',
                      }}
                    >
                      {event.deadline && `⏰ ${event.deadline}`}
                      {event.registration && `📝 ${event.registration}`}
                      {event.call && `🎨 ${event.call}`}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: mobile ? 1 : 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant={event.status === 'upcoming' ? 'contained' : 'outlined'}
                    color="primary"
                    disabled={event.status === 'completed'}
                    component={Link}
                    to={`/register/${event.id}?title=${encodeURIComponent(event.title)}`}
                    sx={{
                      textTransform: 'none',
                      fontSize: mobile ? '0.8rem' : '0.9rem',
                      bgcolor: event.status === 'upcoming' ? 'secondary.main' : undefined,
                    }}
                  >
                    {event.status === 'completed' ? 'View Photos' : event.status === 'ongoing' ? 'Join Now' : 'Register'}
                  </Button>
                  {event.note && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: mobile ? '0.7rem' : '0.8rem' }}
                    >
                      {event.note}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default EventsSection;