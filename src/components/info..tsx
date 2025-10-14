import { Box, Container, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { keyframes } from "@mui/system";
import header from "../assets/images/gsa_header.png";

// Keyframes for animations
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const widthGrow = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const GoldStreamFoundation = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
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
        py: mobile ? 6 : 10,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backgroundImage:
          "linear-gradient(45deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(178, 34, 34, 0.15) 0%, transparent 50%)",
          zIndex: 1,
        },
      }}
      id="foundation"
    >
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <img
          src={header}
          alt="Gold Stream Foundation Header"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))",
          }}
          width={mobile ? 350 : 'auto'}
        />

        <Typography
          variant="body1"
          sx={{
            fontSize: mobile ? "1rem" : "1.1rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            mt: 4,
          }}
        >
          Gold Stream Foundation is the Academy’s corporate social
          responsibility expression for the benefit of orphans, the physically
          challenged and underprivileged children.
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 6,
            mb: 2,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Current Activities of The Foundation
        </Typography>

        <Box
          sx={{
            height: "2px",
            backgroundColor: theme.palette.primary.main,
            mt: 3,
            borderRadius: "2px",
            width: 0,
            animation: isVisible ? `${widthGrow} 1s ease-out 0.8s forwards` : "none",
          }}
        />

        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: mobile ? 4 : 6,
          }}
        >
          <Box
            sx={{
              flex: mobile ? "0 0 100%" : "0 0 55%",
              opacity: 0,
              animation: isVisible
                ? `${fadeInLeft} 0.8s ease-out 0.2s forwards`
                : "none",
            }}
          >
            <Box
              sx={{
                p: mobile ? 3 : 4,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Annual Sponsorship Scholarship for 30% of children admitted into
                Gold Stream Academy
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: mobile ? "1rem" : "1.1rem",
                  lineHeight: 1.8,
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: mobile ? "center" : "left",
                }}
              >
                This sponsorship covers the assets for their entire stay in Gold
                Stream Academy from grade 6 to 12. The 7 year benefits accruing
                to each asset includes academic tuition, sports equipment and
                gear, musical equipment, accommodation and feeding/special
                nutrition, clothing, state of the art medicare, leisure,
                mentoring, etc.
              </Typography>
              <Box
                sx={{
                  height: "2px",
                  backgroundColor: theme.palette.primary.main,
                  mt: 3,
                  borderRadius: "2px",
                  width: 0,
                  animation: isVisible
                    ? `${widthGrow} 1s ease-out 0.8s forwards`
                    : "none",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: mobile ? "0 0 100%" : "0 0 55%",
              opacity: 0,
              animation: isVisible
                ? `${fadeInRight} 0.8s ease-out 0.2s forwards`
                : "none",
            }}
          >
            <Box
              sx={{
                p: mobile ? 3 : 4,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Long term multi-talent scouting, training and development in
                orphanages and other vulnerable institutions and communities
                nationwide
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: mobile ? "1rem" : "1.1rem",
                  lineHeight: 1.8,
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: mobile ? "center" : "left",
                }}
              >
                We visit orphanages and vulnerable communities, identify talents
                and then set up training infrastructure and equipment, as well
                as human resources (coaches, counsellors and mentors) towards
                the training of the discovered assets. This is ongoing and two
                orphanages have been activated till date, with about 38 assets
                in training, made up of 36 footballers and 2 basketballers.
              </Typography>
              <Box
                sx={{
                  height: "2px",
                  backgroundColor: theme.palette.primary.main,
                  mt: 3,
                  borderRadius: "2px",
                  width: 0,
                  animation: isVisible
                    ? `${widthGrow} 1s ease-out 0.8s forwards`
                    : "none",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(178, 34, 34, 0.4) 0%, transparent 70%)",
            zIndex: 1,
            opacity: 0,
            animation: isVisible ? "fadeIn 1s ease-out 1s forwards" : "none",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 0.3 },
            },
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "5%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 160, 23, 0.3) 0%, transparent 70%)",
            zIndex: 1,
            opacity: 0,
            animation: isVisible
              ? "fadeInSlow 1s ease-out 1.2s forwards"
              : "none",
            "@keyframes fadeInSlow": {
              from: { opacity: 0 },
              to: { opacity: 0.2 },
            },
          }}
        />
      </Container>
    </Box>
  );
};

export default GoldStreamFoundation;