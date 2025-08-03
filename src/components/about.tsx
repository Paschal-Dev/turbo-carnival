import { Box, Typography, Container, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState, type JSX } from "react";
import { HistoryEdu, Favorite, School, SportsSoccer } from "@mui/icons-material";
import sport1 from "../assets/images/sport1.avif";
import sport2 from "../assets/images/sport2.avif";
import sport3 from "../assets/images/sport3.jpg";
import sport4 from "../assets/images/sport4.avif";

export default function About() {
  const [deviceType, setDeviceType] = useState("mobile");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (mobile) setDeviceType("mobile");
    else if (tablet) setDeviceType("tablet");
    else setDeviceType("pc");
  }, [mobile, tablet]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems = ["Our History", "Our Values", "Our Mission", "Sports and Extracurriculars"];
  type MenuItem = (typeof menuItems)[number];

  const content: Record<MenuItem, JSX.Element> = {
    "Our History": (
      <>
        <Typography fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)} variant="h4" fontWeight={700} color="#1976d2" pb={deviceType === "mobile" ? 1 : 2}>
          <HistoryEdu sx={{ color: "#1976d2", fontSize: deviceType === "mobile" ? 20 : 28 }} /> Our History
        </Typography>
        <img src={sport1} alt="Our History" style={{ width: "100%", height: deviceType === "mobile" ? "150px" : "auto" }} />
        <Typography variant="body1" paragraph sx={{ color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "mobile" ? "0.9rem" : "1rem" }}>
          Founded in 2005, Gold Stream Academy began as a small community school with a vision to redefine education. Over the years, we have grown into a leading institution known for our innovative curriculum and unwavering dedication to student success.
        </Typography>
      </>
    ),
    "Our Values": (
      <>
        <Typography fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)} variant="h4" fontWeight={700} color="#1976d2" pb={deviceType === "mobile" ? 1 : 2}>
          <Favorite sx={{ color: "#1976d2", fontSize: deviceType === "mobile" ? 20 : 28 }} /> Our Values
        </Typography>
        <img src={sport2} alt="Our Values" style={{ width: "100%", height: deviceType === "mobile" ? "150px" : "auto" }} />
        <Typography variant="body1" paragraph sx={{ color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "mobile" ? "0.9rem" : "1rem" }}>
          Integrity, excellence, and inclusivity are the cornerstones of Gold Stream Academy. We celebrate diversity and create an environment where every student feels valued and empowered.
        </Typography>
      </>
    ),
    "Our Mission": (
      <>
        <Typography fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)} variant="h4" fontWeight={700} color="#1976d2" pb={deviceType === "mobile" ? 1 : 2}>
          <School sx={{ color: "#1976d2", fontSize: deviceType === "mobile" ? 20 : 28 }} /> Our Mission
        </Typography>
        <img src={sport3} alt="Our Mission" style={{ width: "100%", height: deviceType === "mobile" ? "150px" : "auto" }} />
        <Typography variant="body1" paragraph sx={{ color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "mobile" ? "0.9rem" : "1rem" }}>
          At Gold Stream Academy, we are dedicated to fostering academic excellence, leadership, and personal growth through a holistic approach. Our mission is to nurture an environment where students thrive.
        </Typography>
      </>
    ),
    "Sports and Extracurriculars": (
      <>
        <Typography fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)} variant="h4" fontWeight={700} color="#1976d2" pb={deviceType === "mobile" ? 1 : 2}>
          <SportsSoccer sx={{ color: "#1976d2", fontSize: deviceType === "mobile" ? 20 : 28 }} /> Sports and Extracurriculars
        </Typography>
        <img src={sport4} alt="Sports and Extracurriculars" style={{ width: "100%", height: deviceType === "mobile" ? "150px" : "auto" }} />
        <Typography variant="body1" paragraph sx={{ color: "text.secondary", lineHeight: 1.5, fontSize: deviceType === "mobile" ? "0.9rem" : "1rem" }}>
          We believe sports and extracurriculars build teamwork, discipline, and resilience. Our world-class facilities support soccer, basketball, track, and more, with professional coaching.
        </Typography>
      </>
    ),
  };
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  useEffect(() => {
    if (deviceType === "mobile") {
      const interval = setInterval(() => {
        setSelectedItem((prevItem) => {
          const currentIndex = menuItems.indexOf(prevItem);
          return menuItems[(currentIndex + 1) % menuItems.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [deviceType, menuItems]);

  const styles = {
    backgroundColor: "#ffffff",
    color: "#1976d2",
    borderRadius: "10px",
    border: "1px solid #1976d2",
    p: deviceType === "mobile" ? 2 : 6,
    width: deviceType === "mobile" ? "100%" : "90%",
  };

  return (
    <Box bgcolor="#e8e8e8" color="#000000" pb={5} pt={5}>
      <Container disableGutters={deviceType === "mobile" || deviceType === "tablet" ? false : true}>
        <Box textAlign="center" px={deviceType === "mobile" ? 0 : 2}>
          <Typography
            variant="h2"
            fontSize={deviceType === "mobile" ? 24 : (deviceType === "tablet" ? 32 : 48)}
            fontWeight={900}
            color="#1976d2"
            paddingBottom={deviceType === "mobile" ? 1 : 2}
          >
            About Us
          </Typography>
          <hr style={{ width: deviceType === "mobile" ? "30%" : "20%", border: "1px solid #1976d2" }} />
        </Box>
      </Container>
      <Box sx={{ display: "flex", mt: deviceType === "mobile" ? 2 : 6, p: deviceType === "mobile" ? 1 : 5, bgcolor: "#ffffff", flexDirection: deviceType === "mobile" ? "column" : "row" }}>
        <Box sx={{ display: deviceType === "mobile" ? "none" : "block", width: "33.33%", pr: 2, bgcolor: "#ffffff" }}>
          <Box component="ul" sx={{ listStyleType: "none", padding: 0, position: "relative" }}>
            {menuItems.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: 2,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    display: "inline-block",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: selectedItem === item ? "#1976d2" : "#333333",
                    marginRight: 1,
                  },
                  "&:hover::before": { backgroundColor: "#1976d2" },
                  "&:not(:last-child)::after": {
                    content: '""',
                    position: "absolute",
                    left: "5px",
                    top: "50%",
                    width: "2px",
                    height: "calc(100% - 20px)",
                    backgroundColor: "#333333",
                    zIndex: -1,
                  },
                  "&:hover::after, &:hover::before": { backgroundColor: "#1976d2" },
                }}
                onClick={() => setSelectedItem(item)}
              >
                <Typography
                  variant="body1"
                  fontSize={deviceType === "mobile" ? 16 : 24}
                  borderRadius="5px"
                  p={1}
                  fontWeight={selectedItem === item ? 800 : 400}
                  color={selectedItem === item ? "#1976d2" : "#333333"}
                  sx={{
                    position: "relative",
                    transition: "border 0.3s ease",
                    border: selectedItem === item ? "1px solid #1976d2" : "none",
                    "&:hover": { border: "1px solid #1976d2", fontWeight: 800 },
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
            <Box sx={{ position: "absolute", top: 0, left: "10px", width: "2px", height: "100%", backgroundColor: "#333333", zIndex: -1, "&:hover": { backgroundColor: "#1976d2" } }} />
          </Box>
        </Box>
        <Box sx={{ width: deviceType === "mobile" ? "100%" : "66.66%" }}>
          <Box sx={styles}>{content[selectedItem]}</Box>
        </Box>
      </Box>
    </Box>
  );
}