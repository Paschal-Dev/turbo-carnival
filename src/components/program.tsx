import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { School, SportsSoccer, Palette, Science } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Programs = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));

  const programs = [
    {
      title: "SPORTS",
      description:
        "Football, basketball, athletics, lawn tennis, swimming etc",
      icon: (
        <SportsSoccer
          sx={{ fontSize: mobile ? 40 : 60, color: "primary.main" }}
        />
      ),
    },
    {
      title: "ARTS",
      description: "Performing arts, music, movie/film, broadcasting etc",
      icon: (
        <Palette sx={{ fontSize: mobile ? 40 : 60, color: "primary.main" }} />
      ),
    },
    {
      title: "APPLIED SCIENCE",
      description: "Practical state of the art scientific innovation",
      icon: (
        <Science sx={{ fontSize: mobile ? 40 : 60, color: "primary.main" }} />
      ),
    },
    {
      title: "ACADEMICS",
      description:
        "An optimized Nigerian curriculum",
      icon: (
        <School sx={{ fontSize: mobile ? 40 : 60, color: "primary.main" }} />
      ),
    },
  ];
  const widthGrow = keyframes`
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  `;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        py: mobile ? 4 : 8,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%)",
      }}
      id="programs"
    >
      <Container>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          mt={mobile ? 4 : 4}
          sx={{
            mb: mobile ? 4 : 6,
            color: "primary.main",
            fontSize: mobile ? "1.5rem" : "2.5rem",
          }}
        >
          CO-CURRICULAR STREAMS
        </Typography>

        <Box
          sx={{
            height: "2px",
            backgroundColor: theme.palette.primary.main,
            mb: mobile ? 3 : 6,
            borderRadius: "2px",
            width: 0,
            animation: isVisible
              ? `${widthGrow} 1s ease-out 0.8s forwards`
              : "none",
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 column on mobile
              sm: "repeat(2, 1fr)", // 2 columns on small screens
              md: "repeat(4, 1fr)", // 4 columns on medium and larger screens
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
            justifyItems: "center", // Center cards horizontally
            alignItems: "stretch", // Ensure cards are equal height
          }}
        >
          {programs.map((program, index) => (
            <Box key={index} sx={{ maxWidth: "300px", width: "100%" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: "12px",
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, textAlign: "center", p: mobile ? 2 : 3 }}
                >
                  <Box sx={{ mb: 2 }}>{program.icon}</Box>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    gutterBottom
                    sx={{ fontSize: mobile ? "1.2rem" : "1.5rem" }}
                  >
                    {program.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: mobile ? "0.9rem" : "1rem" }}
                  >
                    {program.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Programs;
