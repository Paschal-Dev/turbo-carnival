import { Box, Container, Typography, Card, CardContent, Avatar, useMediaQuery, useTheme, Modal, Button } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'Gold Stream Academy has been a transformative experience for my daughter, Emily. The teachers are incredibly dedicated, fostering both academic excellence and personal growth. The small class sizes allow for personalized attention, which has helped Emily excel in math and science. The school’s emphasis on extracurricular activities, like the drama club, has boosted her confidence and creativity. The supportive community and state-of-the-art facilities make it a nurturing environment where students thrive. I’m grateful for the holistic education that prepares Emily for future challenges while encouraging her to pursue her passions with enthusiasm.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Michael Chen',
    text: 'As a parent, I couldn’t be happier with Gold Stream Academy. My son, Liam, has grown into a confident and curious learner thanks to the school’s innovative curriculum and supportive faculty. The STEM program, with hands-on projects like robotics, has sparked his interest in engineering. The sports facilities are top-notch, and the soccer team has taught him teamwork and discipline. The teachers regularly communicate with us, ensuring we’re involved in his progress. Gold Stream’s commitment to fostering well-rounded individuals makes it an exceptional choice for any family seeking quality education.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Emily Rodriguez',
    text: 'Gold Stream Academy has exceeded our expectations. My daughter, Sophia, loves the arts and music program, where she’s learned to play the violin and perform in school concerts. The teachers are passionate and encourage creativity, helping her develop her artistic talents. The academic curriculum is rigorous yet supportive, with tutors available to ensure no student falls behind. The school’s focus on values like integrity and inclusivity has shaped Sophia into a compassionate individual. We feel confident that Gold Stream is preparing her for a bright future in both academics and personal growth.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'David Patel',
    text: 'Enrolling my son, Aarav, at Gold Stream Academy was one of the best decisions we made. The secondary education program challenges him with advanced courses while providing mentorship to guide his career aspirations. The school’s debate club has honed his public speaking skills, and the community service initiatives have instilled a sense of responsibility. The faculty’s dedication is evident in their tailored approach to each student’s needs. The campus facilities, from science labs to sports fields, are impressive. Gold Stream has created an environment where Aarav is thriving academically and socially.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf3356de?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Lisa Thompson',
    text: 'Gold Stream Academy has been a game-changer for my twins, Ethan and Olivia. The primary education program offers a balanced curriculum that nurtures their curiosity while building a strong foundation in core subjects. The teachers are patient and innovative, using interactive methods like group projects and storytelling to keep learning fun. The extracurricular options, from soccer to painting, allow both children to explore their interests. The school’s emphasis on community and inclusivity has helped them form meaningful friendships. We’re thrilled with the progress they’ve made and the supportive environment Gold Stream provides.',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379f42f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'James Okoye',
    text: 'My daughter, Amara, has flourished at Gold Stream Academy. The sports programs, particularly basketball, have taught her discipline and teamwork, while the coaching staff provides exceptional guidance. Academically, the school offers a challenging yet supportive environment, with resources like after-school tutoring to ensure success. The STEM enrichment program has introduced her to coding, sparking an interest in technology. The school’s commitment to fostering leadership and integrity is evident in every aspect, from classroom discussions to extracurricular activities. Gold Stream has given Amara the tools to excel and pursue her dreams with confidence.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Rachel Kim',
    text: 'Gold Stream Academy has provided an outstanding education for my son, Noah. The arts and music program has allowed him to explore his passion for painting, with opportunities to exhibit his work at school events. The academic curriculum is well-rounded, blending rigorous coursework with creative projects that keep him engaged. The teachers are approachable and dedicated, always willing to provide extra support. The school’s focus on diversity and inclusion has helped Noah develop empathy and respect for others. We’re grateful for the nurturing environment that encourages both academic and personal growth.',
    avatar: 'https://images.unsplash.com/photo-1492106040409-4e4a0a4a8c7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    name: 'Thomas Adebayo',
    text: 'My son, Tunde, has thrived at Gold Stream Academy thanks to its exceptional programs and dedicated staff. The secondary education curriculum challenges him with advanced courses in math and literature, preparing him for university. The school’s leadership programs, like the student council, have helped him develop confidence and public speaking skills. The sports facilities are impressive, and the track team has been a great outlet for his energy. The faculty’s commitment to individualized attention ensures Tunde feels supported in his academic and extracurricular pursuits. Gold Stream is truly shaping him into a well-rounded leader.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
];

const Testimonials = () => {
  const [deviceType, setDeviceType] = useState("mobile");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (mobile) setDeviceType("mobile");
    else if (tablet) setDeviceType("tablet");
    else setDeviceType("pc");
  }, [mobile, tablet]);

  const [selectedTestimonial, setSelectedTestimonial] = useState<null | (typeof testimonials)[number]>(null);

  const handleOpenModal = (testimonial: (typeof testimonials)[number]) => {
    setSelectedTestimonial(testimonial);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 120000,
    arrows: true,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    appendDots: (dots: React.ReactNode) => <Box sx={{ mt: 2, '& ul': { display: 'flex', justifyContent: 'center', gap: 1 } }}>{dots}</Box>,
    customPaging: () => (
      <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: '50%', cursor: 'pointer', '&.slick-active': { bgcolor: 'primary.dark' } }} />
    ),
  };

  return (
    <Box sx={{ py: deviceType === "mobile" ? 4 : 8, bgcolor: "secondary.main" }} id="testimonials">
      <Container>
        <Box textAlign="center" px={deviceType === "mobile" ? 0 : 2} mb={deviceType === "mobile" ? 2 : 4}>
          <Typography
            variant="h2"
            fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)}
            fontWeight={900}
            color="#1976d2"
            paddingBottom={deviceType === "mobile" ? 1 : 2}
          >
            What Parents Say
          </Typography>
          <hr style={{ width: deviceType === "mobile" ? "30%" : "20%", border: "1px solid #1976d2" }} />
        </Box>
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 0 } }}>
          {deviceType === "mobile" ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    onClick={() => handleOpenModal(testimonial)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      bgcolor: 'white',
                      borderRadius: 2,
                      p: 1,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.02)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
                    }}
                  >
                    <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 40, height: 40, mr: 2 }} />
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                  </Card>
                ))}
              </Box>
              <Modal
                open={!!selectedTestimonial}
                onClose={handleCloseModal}
                aria-labelledby="testimonial-modal-title"
                aria-describedby="testimonial-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    width: '90%',
                    maxWidth: 500,
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                    outline: 'none',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar src={selectedTestimonial?.avatar} alt={selectedTestimonial?.name} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                    <Typography id="testimonial-modal-title" variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                      {selectedTestimonial?.name}
                    </Typography>
                    <Typography id="testimonial-modal-description" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {selectedTestimonial?.text}
                    </Typography>
                    <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Close
                    </Button>
                  </CardContent>
                </Card>
              </Modal>
            </>
          ) : deviceType === "pc" ? (
            <>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 2 }}>
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    onClick={() => handleOpenModal(testimonial)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      bgcolor: 'white',
                      borderRadius: 2,
                      p: 1,
                      width: '45%', // Approximately half width for two per row
                      minWidth: 200,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 50, height: 50, mr: 2 }} />
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {testimonial.name}
                    </Typography>
                  </Card>
                ))}
              </Box>
              <Modal
                open={!!selectedTestimonial}
                onClose={handleCloseModal}
                aria-labelledby="testimonial-modal-title"
                aria-describedby="testimonial-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    width: '90%',
                    maxWidth: 500,
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                    outline: 'none',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar src={selectedTestimonial?.avatar} alt={selectedTestimonial?.name} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                    <Typography id="testimonial-modal-title" variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                      {selectedTestimonial?.name}
                    </Typography>
                    <Typography id="testimonial-modal-description" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {selectedTestimonial?.text}
                    </Typography>
                    <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Close
                    </Button>
                  </CardContent>
                </Card>
              </Modal>
            </>
          ) : (
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <Box key={index} sx={{ px: deviceType === "tablet" ? 1 : 2 }}>
                  <Card
                    sx={{
                      maxWidth: "500px",
                      mx: "auto",
                      bgcolor: "white",
                      borderRadius: 3,
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                      border: "1px solid",
                      borderColor: "primary.light",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      animation: "fadeIn 0.5s ease-in-out",
                      "&:hover": { transform: "scale(1.03)", boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)" },
                      minHeight: deviceType === "tablet" ? "300px" : "400px",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: deviceType === "tablet" ? 2 : 5, px: deviceType === "tablet" ? 1 : 3 }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} />
                      <Typography variant="body1" sx={{ mb: 1, color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "tablet" ? "0.9rem" : "1rem" }}>
                        "{testimonial.text.slice(0, deviceType === "tablet" ? 150 : 300)}..."
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                        - {testimonial.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;