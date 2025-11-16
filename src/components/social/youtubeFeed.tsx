import { useEffect, useState, type SetStateAction } from "react";
import {
Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
} from "@mui/material";
import YouTube from "react-youtube";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// import one from "../../assets/images/new1.webp";
// import two from "../../assets/images/new2.jpg";
// import three from "../../assets/images/new3.avif";
// import four from "../../assets/images/new4.jpg";

const MediaGallery = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
   const [dots, setDots] = useState(".");

  // Animate "updating....." text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 5 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Sample YouTube video IDs (replace with your actual ones)
  const videoIds = [
    "jn1dZ_dkgGY",
    "yV_MRQ1XPY8",
    "YTTflPIVfg4",
    "zqiP99vmuzE",
    "a6t1-uedVlY",
    "YGhWzkb9S00",
    "Ec23aZg9Wk8",
    "fDhaWp99ikk"
  ];

  // Sample still picture URLs (replace with real paths or links)
  // const photos = [
  //   one,
  //   two,
  //   three,
  //   four,
  // ];

  const opts = {
    height: mobile ? "200" : "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleSeeMoreClick = () => {
    window.open("https://www.youtube.com/@GOLDSTREAMACADEMY", "_blank");
  };

  const handleNextVideo = () => {
    setSelectedVideoIndex((prevIndex) =>
      prevIndex === videoIds.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevVideo = () => {
    setSelectedVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoIds.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: SetStateAction<number>) => {
    setSelectedVideoIndex(index);
  };

   // 4 animated cards alternating black/red
  const animatedCards = Array.from({ length: 4 }, (_, i) => ({
    bgColor: i % 2 === 0 ? "#000" : "#b71c1c",
  }));

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: "background.default" }} id="media">
      <Container>
        {/* Section Title */}
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 3 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: "primary.main",
            fontSize: mobile ? "1.8rem" : "2.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Media Gallery
        </Typography>

         {/* -------------------- PHOTO GALLERY SECTION -------------------- */}
        {/* <Typography
          variant="h5"
          align="center"
          sx={{
            color: "text.primary",
            mb: mobile ? 3 : 4,
            fontWeight: 600,
          }}
        >
          Photo Gallery
        </Typography> */}

        {/* <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: mobile ? 2 : 3,
            px: mobile ? 1 : 0,
          }}
        >
          {photos.map((photo, index) => (
            <Box
              key={index}
              sx={{
                flexBasis: mobile
                  ? "48%"
                  : tablet
                  ? "30%"
                  : "22%", // 2 columns mobile, 3 tablet, 4 desktop
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={photo}
                alt={`Gallery photo ${index + 1}`}
                sx={{
                  width: "100%",
                  height: mobile ? 120 : 180,
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          ))}
        </Box> */}

        {/* -------------------- Animated Loader Cards Section -------------------- */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: mobile ? 2 : 3,
            px: mobile ? 1 : 0,
          }}
        >
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

        {/* -------------------- YOUTUBE SECTION -------------------- */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: "text.primary",
            mb: mobile ? 3 : 4,
            mt: mobile ? 3 : 4,
            fontWeight: 600,
          }}
        >
          Our YouTube Channel
        </Typography>

        {/* Main YouTube Player */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            maxWidth: mobile ? "100%" : 800,
            mx: "auto",
            border: "1px solid",
            borderColor: "primary.main",
            mb: 4,
          }}
        >
          <YouTube videoId={videoIds[selectedVideoIndex]} opts={opts} />
        </Box>

        {/* Video Navigation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <IconButton
            onClick={handlePrevVideo}
            sx={{
              color: "primary.main",
              "&:hover": { backgroundColor: "primary.main", color: "white" },
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>

          <Box sx={{ mx: 2, display: "flex", overflowX: "auto", py: 2 }}>
            {videoIds.map((id, index) => (
              <Box
                key={id}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  minWidth: mobile ? 80 : 120,
                  height: mobile ? 60 : 90,
                  mx: 1,
                  cursor: "pointer",
                  border: selectedVideoIndex === index ? "3px solid" : "1px solid",
                  borderColor:
                    selectedVideoIndex === index ? "secondary.main" : "grey.300",
                  borderRadius: 1,
                  overflow: "hidden",
                  position: "relative",
                  opacity: selectedVideoIndex === index ? 1 : 0.7,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={handleNextVideo}
            sx={{
              color: "primary.main",
              "&:hover": { backgroundColor: "primary.main", color: "white" },
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", mb: mobile ? 6 : 8 }}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              px: 4,
              fontWeight: "bold",
              borderColor: "secondary.main",
              fontSize: mobile ? "0.9rem" : "1rem",
              color: "#000",
            }}
            onClick={handleSeeMoreClick}
          >
            See More Videos
          </Button>
        </Box>

       
      </Container>
    </Box>
  );
};

export default MediaGallery;
