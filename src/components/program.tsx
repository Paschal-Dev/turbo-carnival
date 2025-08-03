import { Box, Container, Typography, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';

const programs = [
  { title: 'Primary Education', description: 'Our Primary Education program builds a strong foundation with a curriculum in reading, math, and science.' },
  { title: 'Secondary Education', description: 'Secondary Education offers an advanced curriculum in sciences, math, and technology, with AP options training.' },
  { title: 'Sports Programs', description: 'Sports Programs promote fitness and teamwork through soccer, basketball, and volleyball, with top facilities and coaching.' },
  { title: 'Arts and Music', description: 'Arts and Music nurtures creativity with painting, drama, and music in equipped studios.' },
  { title: 'STEM Enrichment', description: 'STEM Enrichment immerses students in science, tech, engineering, and math with hands-on projects and labs.' },
  { title: 'Language and Culture', description: 'Language and Culture enhances communication with diverse language courses and cultural studies.' },
];

const Programs = () => {
  const [deviceType, setDeviceType] = useState("mobile");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (mobile) setDeviceType("mobile");
    else if (tablet) setDeviceType("tablet");
    else setDeviceType("pc");
  }, [mobile, tablet]);

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
    <Box sx={{ py: deviceType === "mobile" ? 4 : 8, bgcolor: "background.paper" }} id="programs">
      <Container>
        <Box textAlign="center" px={deviceType === "mobile" ? 0 : 2} mb={deviceType === "mobile" ? 2 : 4}>
          <Typography
            variant="h2"
            fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)}
            fontWeight={900}
            color="#1976d2"
            paddingBottom={deviceType === "mobile" ? 1 : 2}
          >
            Our Programs
          </Typography>
          <hr style={{ width: deviceType === "mobile" ? "30%" : "20%", border: "1px solid #1976d2" }} />
        </Box>
        {deviceType === "mobile" || deviceType === "tablet" ? (
          <Box sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, md: 0 } }}>
            <Slider {...settings}>
              {programs.map((program, index) => (
                <Box key={index} sx={{ px: deviceType === "mobile" ? 1 : 2 }}>
                  <Card
                    sx={{
                      maxWidth: "600px",
                      mx: "auto",
                      bgcolor: "white",
                      borderRadius: 3,
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                      border: "1px solid",
                      borderColor: "primary.light",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      animation: "fadeIn 0.5s ease-in-out",
                      "&:hover": { transform: "scale(1.03)", boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)" },
                      minHeight: deviceType === "mobile" ? "200px" : "250px",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: deviceType === "mobile" ? 2 : 5, px: deviceType === "mobile" ? 1 : 3 }}>
                      <Typography variant="h5" gutterBottom sx={{ color: "primary.main", fontWeight: "bold", fontSize: deviceType === "mobile" ? "1.2rem" : "1.5rem" }}>
                        {program.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "mobile" ? "0.9rem" : "1rem" }}>
                        {program.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <Box sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, md: 0 } }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
              {programs.map((program, index) => (
                <Card
                  key={index}
                  sx={{
                    width: { xs: "100%", md: "45%" },
                    bgcolor: "white",
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    border: "1px solid",
                    borderColor: "primary.light",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    animation: "fadeIn 0.5s ease-in-out",
                    "&:hover": { transform: "scale(1.03)", boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 5, px: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ color: "primary.main", fontWeight: "bold" }}>
                      {program.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Programs;