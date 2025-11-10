import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import flyer from "../assets/olympiad-banner.jpg";

const AdvertisementOverlay = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Check if the current date is before November 8, 2025
    const expirationDate = new Date("2025-11-20");
    const currentDate = new Date();

    if (currentDate < expirationDate) {
      setShowAd(true);

      // Set timer to close ad after 1 minute (60000 milliseconds)
      const timer = setTimeout(() => {
        setShowAd(false);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowAd(false);
  };

  if (!showAd) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          // width: "60vw", // ✅ Reduced width (was maxWidth: '95%')
          height: "60vh", // ✅ Reduced height (was maxHeight: '95%')
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "white",
          p: 1,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          <Close />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={flyer}
            alt="Special Offer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // Keeps aspect ratio
              display: "block",
            }}
          />
        </Box>

        {/* <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 1,
            fontSize: "0.75rem",
          }}
        >
          Offer valid until November 8, 2025
        </Typography> */}
      </Box>
    </Box>
  );
};

export default AdvertisementOverlay;
