// import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  // Card,
  // keyframes,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

// --- Commented out original testimonial data ---
// const testimonials = [
//   {
//     name: "Jane Doe",
//     role: "Parent",
//     quote:
//       "Gold Stream Academy transformed my child’s confidence and academic performance. The teachers are dedicated, and the sports programs are outstanding.",
//     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//   },
//   {
//     name: "John Smith",
//     role: "Alumni",
//     quote:
//       "The sports program at GSA gave me lifelong skills in teamwork and leadership. I’m grateful for the coaches who pushed me to excel.",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
//   },
//   {
//     name: "Sarah Lee",
//     role: "Teacher",
//     quote:
//       "Teaching at GSA is rewarding; the students are motivated and eager to learn. The supportive environment makes it a joy to come to work.",
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//   },
//   {
//     name: "Michael Brown",
//     role: "Parent",
//     quote:
//       "My daughter loves the STEM initiatives at GSA. The hands-on projects have sparked her interest in science and technology.",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//   },
//   {
//     name: "Emily Chen",
//     role: "Student",
//     quote:
//       "I’ve made amazing friends and learned so much at GSA. The art classes are my favorite, and I love performing in the school musical.",
//     avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
//   },
//   {
//     name: "David Wilson",
//     role: "Coach",
//     quote:
//       "Coaching at GSA is a privilege. Watching our athletes grow in skill and character is incredibly fulfilling.",
//     avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//   },
// ];

// const loadingAnimation = keyframes`
//   0% { content: "."; }
//   33% { content: ".."; }
//   66% { content: "..."; }
//   100% { content: "."; }
// `;

const Testimonials = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [dots, setDots] = useState(".");
  
    // Animate "updating....." text
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length >= 5 ? "." : prev + "."));
      }, 400);
      return () => clearInterval(interval);
    }, []);
   const animatedCards = Array.from({ length: 6 }, (_, i) => ({
    bgColor: i % 2 === 0 ? "#000" : "#b71c1c",
  }));

  return (
    <Box
      sx={{
        py: mobile ? 4 : 8,
        backgroundColor: "background.paper",
      }}
      id="testimonials"
    >
      <Container>
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 4 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: "primary.main",
            fontSize: mobile ? "1.5rem" : "2.5rem",
          }}
        >
          Feedback from Our Community
        </Typography>

        {/* --- New wallpaper grid replacing testimonial accordions --- */}
        <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: mobile ? 2 : 3,
                    px: mobile ? 1 : 4,
                  }}
                >
        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: mobile ? 2 : 4,
            justifyItems: "center",
            alignItems: "stretch",
          }}
        > */}
           {animatedCards.map((card, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: mobile
                  ? "48%"
                  : tablet
                  ? "30%"
                  : "22%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: mobile ? 120 : 180,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: card.bgColor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: mobile ? "1rem" : "1.3rem",
                  textTransform: "uppercase",
                  animation: "pulse 1.5s infinite ease-in-out",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.6 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.6 },
                  },
                }}
              >
                updating{dots}
              </Box>
            </Box>
          ))}
        </Box>

        {/* --- Commented out original testimonial accordion layout ---
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: mobile ? 2 : 4,
            justifyItems: "center",
            alignItems: "stretch",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ maxWidth: "400px", width: "100%" }}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
                  border: "3px solid",
                  borderColor: "primary.main",
                  borderRadius: "12px",
                  bgcolor: "background.paper",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
                  sx={{ p: mobile ? 2 : 3, textAlign: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: mobile ? 60 : 80,
                        height: mobile ? 60 : 80,
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{ fontSize: mobile ? "1rem" : "1.2rem", mb: 1 }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: mobile ? "0.8rem" : "0.9rem" }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ p: mobile ? 2 : 3, textAlign: "center" }}
                >
                  <FormatQuote
                    sx={{
                      fontSize: mobile ? 30 : 40,
                      color: "primary.main",
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontStyle: "italic",
                      fontSize: mobile ? "0.9rem" : "1rem",
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
        */}
      </Container>
    </Box>
  );
};

export default Testimonials;
