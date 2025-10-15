import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FormatQuote, ExpandMore } from "@mui/icons-material";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Parent",
    quote:
      "Gold Stream Academy transformed my child’s confidence and academic performance. The teachers are dedicated, and the sports programs are outstanding.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", // Placeholder avatar
  },
  {
    name: "John Smith",
    role: "Alumni",
    quote:
      "The sports program at GSA gave me lifelong skills in teamwork and leadership. I’m grateful for the coaches who pushed me to excel.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde", // Placeholder avatar
  },
  {
    name: "Sarah Lee",
    role: "Teacher",
    quote:
      "Teaching at GSA is rewarding; the students are motivated and eager to learn. The supportive environment makes it a joy to come to work.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", // Placeholder avatar
  },
  {
    name: "Michael Brown",
    role: "Parent",
    quote:
      "My daughter loves the STEM initiatives at GSA. The hands-on projects have sparked her interest in science and technology.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Placeholder avatar
  },
  {
    name: "Emily Chen",
    role: "Student",
    quote:
      "I’ve made amazing friends and learned so much at GSA. The art classes are my favorite, and I love performing in the school musical.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9", // Placeholder avatar
  },
  {
    name: "David Wilson",
    role: "Coach",
    quote:
      "Coaching at GSA is a privilege. Watching our athletes grow in skill and character is incredibly fulfilling.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", // Placeholder avatar
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        py: mobile ? 4 : 8,
        backgroundColor: "rgba(173, 168, 168, 0.85)",
        backgroundImage:
          "linear-gradient(45deg, rgba(45, 39, 39, 0.65) 0%, rgba(71, 65, 65, 0.74) 100%)",
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
            color: "background.default",
            fontSize: mobile ? "1.5rem" : "2.5rem",
          }}
        >
          Feedback from Our Community
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 column on mobile
              md: "repeat(3, 1fr)", // 3 columns on medium and larger
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
            justifyItems: "center", // Center accordions horizontally
            alignItems: "stretch", // Ensure accordions are equal height
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
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/80?text=Avatar";
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
      </Container>
    </Box>
  );
};

export default Testimonials;
