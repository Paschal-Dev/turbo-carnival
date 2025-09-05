import { useEffect, useState, type JSX } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HistoryEdu,
  Favorite,
  School,
  SportsSoccer,
} from "@mui/icons-material";

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

  const menuItems = [
    "Our History",
    "Our Values",
    "Our Mission",
    "Sports and Extracurriculars",
  ];
  type MenuItem = (typeof menuItems)[number];

  const content: Record<MenuItem, JSX.Element> = {
    "Our History": (
      <>
        <Typography
          fontSize={
            deviceType === "mobile" ? 24 : deviceType === "tablet" ? 32 : 48
          }
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === "mobile" ? 1 : 2}
        >
          <HistoryEdu
            sx={{
              color: "primary.main",
              fontSize: deviceType === "mobile" ? 20 : 28,
            }}
          />{" "}
          Our History
        </Typography>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0EnJmozD228XM_jgIgwtUJ_OTZLHfhM6UA&s"
          alt="Our History"
          style={{
            width: "100%",
            height: deviceType === "mobile" ? "150px" : "auto",
            objectFit: "cover",
          }}
        />

        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
          }}
        >
          <strong>
            Our Mission: Empowering Youth Through a Holistic Approach
          </strong>
          <br />
          In 605 BC, a visionary king of a reigning empire selected talented
          youths—young men without blemish, handsome, gifted in wisdom,
          knowledgeable, quick to understand, and ready to serve. These youths
          were groomed in various aspects of life and knowledge, receiving
          specialized nutrition to become instruments of innovation,
          advancement, and world dominance. Inspired by this ancient model, Gold
          Stream Academy adopts a hybrid (for-profit/non-profit) coeducational
          platform to address critical youth and leadership development
          challenges in Nigeria and Africa.
          <strong>Challenges in Youth and Leadership Development</strong>
          <br />
          The current educational and socio-economic landscape in Nigeria and
          Africa faces significant obstacles:
          <ul>
            <li>
              <strong>Limited Opportunities for Talent Development</strong>:
              Lack of structured avenues to explore talents and skills alongside
              academics.
            </li>
            <li>
              <strong>Barriers for the Underprivileged</strong>: Orphaned and
              underprivileged children lack access to premium quality education
              and opportunities to develop their talents.
            </li>
          </ul>
          <strong>Adverse Effects of the Current Gap</strong>
          <br />
          The absence of a balanced approach to education and talent development
          leads to:
          <ul>
            <li>
              Lopsided focus on academics, stifling potential in sports, applied
              science, and creative arts.
            </li>
            <li>
              Use of barely educated or over-aged athletes in age-grade sports
              competitions, particularly at the international level.
            </li>
            <li>
              Premature peaking or burnout of athletes before they reach
              international prominence, unlike their Western peers.
            </li>
            <li>
              Lost opportunities to develop expertise in sports, creative arts,
              and applied science from childhood.
            </li>
          </ul>
          <strong>The Gold Stream Solution</strong>
          <br />
          Gold Stream Academy optimizes sports, arts, and applied science as
          co-curricular streams alongside academics in a purpose-designed
          residential facility. Our commitment includes:
          <ul>
            <li>
              Integrating sports, creative arts, and applied science with
              academic excellence.
            </li>
            <li>
              Offering up to 30% of annual admission places to orphans and
              underprivileged children on full boarding and academic
              scholarships.
            </li>
          </ul>
        </Typography>
      </>
    ),
    "Our Values": (
      <>
        <Typography
          fontSize={
            deviceType === "mobile" ? 24 : deviceType === "tablet" ? 32 : 48
          }
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === "mobile" ? 1 : 2}
        >
          <Favorite
            sx={{
              color: "primary.main",
              fontSize: deviceType === "mobile" ? 20 : 28,
            }}
          />{" "}
          Our Values
        </Typography>
        <img
          src="https://townsquare.media/site/136/files/2025/04/attachment-GettyImages-2201558379.jpg?w=780&q=75"
          alt="Our Values"
          style={{
            width: "100%",
            height: deviceType === "mobile" ? "150px" : "auto",
            objectFit: "cover",
          }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
          }}
        >
          Integrity, Excellence, and Community drive everything we do...
        </Typography>
      </>
    ),
    "Our Mission": (
      <>
        <Typography
          fontSize={
            deviceType === "mobile" ? 24 : deviceType === "tablet" ? 32 : 48
          }
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === "mobile" ? 1 : 2}
        >
          <School
            sx={{
              color: "primary.main",
              fontSize: deviceType === "mobile" ? 20 : 28,
            }}
          />{" "}
          Our Mission
        </Typography>
        <img
          src="https://media.istockphoto.com/id/1318462880/photo/boy-typing-keyboard-for-programming-robot-kit.jpg?s=612x612&w=0&k=20&c=4KDYJtLwLqvZrMAofDJM_7JdtYWi2TuuYEw7qOX7--s="
          alt="Our Mission"
          style={{
            width: "100%",
            height: deviceType === "mobile" ? "150px" : "auto",
            objectFit: "cover",
          }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
          }}
        >
          To inspire and empower students to achieve academic and personal
          success...
        </Typography>
      </>
    ),
    "Sports and Extracurriculars": (
      <>
        <Typography
          fontSize={
            deviceType === "mobile" ? 24 : deviceType === "tablet" ? 32 : 48
          }
          variant="h4"
          fontWeight={700}
          color="primary.main"
          pb={deviceType === "mobile" ? 1 : 2}
        >
          <SportsSoccer
            sx={{
              color: "primary.main",
              fontSize: deviceType === "mobile" ? 20 : 28,
            }}
          />{" "}
          Sports and Extracurriculars
        </Typography>
        <img
          src="https://media.istockphoto.com/id/1412026365/photo/junior-level-basketball-player-bouncing-basketball-young-basketball-player-with-classic-ball.jpg?s=612x612&w=0&k=20&c=Hhb_c1Df2-wS1Rw-0WJa8MA7iQOmJIiuoecHu9_SC_M="
          alt="Sports and Extracurriculars"
          style={{
            width: "100%",
            height: deviceType === "mobile" ? "150px" : "auto",
            objectFit: "cover",
          }}
        />
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "text.secondary",
            lineHeight: 1.5,
            fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
          }}
        >
          We believe sports and extracurriculars build teamwork, discipline, and
          resilience...
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType]);

  const styles = {
    backgroundColor: "background.paper",
    color: "primary.main",
    borderRadius: "10px",
    border: "1px solid",
    borderColor: "primary.main",
    p: deviceType === "mobile" ? 2 : 6,
    width: deviceType === "mobile" ? "100%" : "90%",
  };

 

  return (
    <Box
      bgcolor="background.default"
      color="text.primary"
      pb={5}
      pt={5}
      id="about"
    >
      <Container
        disableGutters={deviceType === "mobile" || deviceType === "tablet"}
      >
        <Box textAlign="center" px={deviceType === "mobile" ? 0 : 2}>
          <Typography
            variant="h2"
            fontSize={
              deviceType === "mobile" ? 24 : deviceType === "tablet" ? 32 : 48
            }
            fontWeight={900}
            color="primary.main"
            mt={deviceType === "mobile" ? 4 : 4}
            paddingBottom={deviceType === "mobile" ? 1 : 2}
          >
            Our Origin & Uniqueness
          </Typography>
          <hr
            style={{
              width: deviceType === "mobile" ? "30%" : "20%",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          />
        </Box>
      </Container>

      {/* Staircase Boxes Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: deviceType === "mobile" ? "column" : "row",
          justifyContent: "center",
          alignItems: "flex-start",
          mt: deviceType === "mobile" ? 2 : 4,
          mb: deviceType === "mobile" ? 2 : 4,
          p: deviceType === "mobile" ? 2 : 0,
          position: "relative",
        }}
      >
        {/* Left Box - Top Step */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "8px",
            p: deviceType === "mobile" ? 2 : 3,
            width: deviceType === "mobile" ? "100%" : "45%",
            zIndex: 1,
            position: "relative",
            mb: deviceType === "mobile" ? 2 : 0,
            mr: deviceType === "mobile" ? 0 : "5%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
              lineHeight: 1.6,
              color: "text.primary",
            }}
          >
            We are a core multi-skill innovative secondary school in Lagos, Nigeria…
          </Typography>
        </Box>

        {/* Right Box - Bottom Step */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "8px",
            p: deviceType === "mobile" ? 2 : 3,
            width: deviceType === "mobile" ? "100%" : "45%",
            zIndex: 2,
            position: "relative",
            mt: deviceType === "mobile" ? 0 : "40px",
            ml: deviceType === "mobile" ? 0 : "-5%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
              lineHeight: 1.6,
              color: "text.primary",
            }}
          >
            …with a vision to be the most impactful leadership and skills-oriented institution of learning in Africa.
          </Typography>
        </Box>

        {/* Connecting Line (visible on desktop) */}
        {deviceType !== "mobile" && (
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "45%",
              width: "10%",
              height: "2px",
              backgroundColor: "primary.main",
              zIndex: 3,
              "&::after": {
                content: '""',
                position: "absolute",
                right: "-6px",
                top: "-4px",
                width: "10px",
                height: "10px",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "50%",
                backgroundColor: "background.default",
              }
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: deviceType === "mobile" ? 2 : 6,
          p: deviceType === "mobile" ? 1 : 5,
          bgcolor: "background.paper",
          flexDirection: deviceType === "mobile" ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: deviceType === "mobile" ? "none" : "block",
            width: "33.33%",
            pr: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box
            component="ul"
            sx={{ listStyleType: "none", padding: 0, position: "relative" }}
          >
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
                    backgroundColor:
                      selectedItem === item ? "primary.main" : "text.primary",
                    marginRight: 1,
                  },
                  "&:hover::before": { backgroundColor: "secondary.main" },
                  "&:not(:last-child)::after": {
                    content: '""',
                    position: "absolute",
                    left: "5px",
                    top: "50%",
                    width: "2px",
                    height: "calc(100% - 20px)",
                    backgroundColor: "text.primary",
                    zIndex: -1,
                  },
                  "&:hover::after": { backgroundColor: "secondary.main" },
                }}
                onClick={() => setSelectedItem(item)}
              >
                <Typography
                  variant="body1"
                  fontSize={deviceType === "mobile" ? 16 : 24}
                  borderRadius="5px"
                  p={1}
                  fontWeight={selectedItem === item ? 800 : 400}
                  color={
                    selectedItem === item ? "primary.main" : "text.primary"
                  }
                  sx={{
                    position: "relative",
                    transition: "border 0.3s ease",
                    border: selectedItem === item ? "1px solid" : "none",
                    borderColor: "primary.main",
                    "&:hover": {
                      border: "1px solid",
                      borderColor: "secondary.main",
                      fontWeight: 800,
                    },
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "10px",
                width: "2px",
                height: "100%",
                backgroundColor: "text.primary",
                zIndex: -1,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: deviceType === "mobile" ? "100%" : "66.66%" }}>
          <Box sx={styles}>{content[selectedItem]}</Box>
        </Box>
      </Box>
     
    </Box>
  );
}