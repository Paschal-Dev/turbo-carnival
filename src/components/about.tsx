import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
            backgroundColor: "rgba(35, 33, 33, 0.1)",
            backgroundImage:
              "linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(106, 90, 90, 0.86) 100%)",
            border: "3px solid",
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
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            We are a core multi-skill innovative secondary school in Lagos,
            Nigeria…
          </Typography>
        </Box>

        {/* Right Box - Bottom Step */}
        <Box
          sx={{
            backgroundColor: "rgba(35, 33, 33, 0.1)",
            backgroundImage:
              "linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(106, 90, 90, 0.86) 100%)",
            border: "3px solid",
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
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            …with a vision to be the most impactful leadership and
            skills-oriented institution of learning in Africa.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: deviceType === "mobile" ? 2 : 4,
          mb: deviceType === "mobile" ? 2 : 4,
          p: deviceType === "mobile" ? 2 : 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(35, 33, 33, 0.1)",
            backgroundImage:
              "linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(106, 90, 90, 0.86) 100%)",
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: "8px",
            p: deviceType === "mobile" ? 2 : 4,
            width: deviceType === "mobile" ? "100%" : "80%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: deviceType === "mobile" ? "0.9rem" : "1rem",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.9)",
              whiteSpace: "pre-line",
            }}
          >
            {`In 605 BC, the king of a reining empire ordered his chief of staff to select a number of talented youths; young men without blemish, handsome, gifted in all wisdom, knowledgeable, quick to understand, and ready to serve; and they were taught and groomed in various aspects of life and knowledge, while also receiving specialized nutrition. These youths became the empire’s instruments of innovation, advancement, development, world dominance and sustainability. Gold Stream Academy have adopted this ancient king’s model in a hybrid (for-profit/non-profit) coeducational platform, in order to address the following overwhelming youth and leadership development challenges plaguing Nigeria and Africa:

The Current Double-Edged Educational and Socio-Economic Need: 

1. Lack of a structured and conditioned avenue to fully explore talents and skills alongside academics;
2. Orphaned and underprivileged children also lack the opportunity for the above as well as premium quality education.

Adverse effects of the current huge gap:

(1) Lopsided focus on academics, while sports, applied science and creative arts potential are stifled;
(2) Use of barely educated and or over aged athletes in age grade sports competitions, especially at international level;
(3) Athletes peak or burn out long before they attain international limelight, unlike Western peers;
(4) The opportunity to develop expertise in sports, performing arts and applied science from childhood is lost.

The Solution. 

The Gold Stream Solution optimizes sports, arts and applied science as co-curricular streams, alongside academics in a purpose-designed residential facility.

Offering up to 30% of annual admission places to orphans and the underprivileged on full boarding and academic scholarship.`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
