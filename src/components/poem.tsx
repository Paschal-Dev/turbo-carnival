import { Typography } from "@mui/material";
import { Box, useMediaQuery, useTheme } from "@mui/system";
import { useState, useEffect } from "react";
import spear from "../assets/images/spear.png";

// Assuming you have imported your custom font via CSS or @font-face already
// e.g. in your global styles:
// @font-face {
//   font-family: "Nosifer";
//   src: url("/fonts/Nosifer.woff2") format("woff2"), …;
// }

export default function Poem() {
  const [deviceType, setDeviceType] = useState("mobile");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (mobile) setDeviceType("mobile");
    else if (tablet) setDeviceType("tablet");
    else setDeviceType("pc");
  }, [mobile, tablet]);

  // Use <br> to control line breaks explicitly, will let us manage vertical spacing too
  const poemLines = [
    "IN THE BIRTHPLACE OF GODS, WE SOJOURN",
    "OF CHARACTER, VIRTUE AND DOMINION, ONLY EAGLES DARE",
    "MOUNTAINS ABOUND, BUT VICTORY, SAVOUR OF THE BRAVE",
    "REFINED FOR GREATNESS, STAND FAST, FOR YE ARE GODS",
  ];

  return (
    <Box
      sx={{
        mt: deviceType === "mobile" ? 4 : 8,
        p: deviceType === "mobile" ? 2 : 4,
        position: "relative",
        textAlign: "center",
        mx: "auto",
        overflow: "hidden",
      }}
    >
      {/* Left spear */}
      <Box
        component="img"
        src={spear}
        alt="spear left"
        sx={{
          position: "absolute",
          left: deviceType === "mobile" ? -165 : -500,
          top: 0,
          height: "100%", // make the spear stretch full height if desired
          objectFit: "contain",
          pointerEvents: "none",
          width: "100%",
          // display: { xs: "none", md: "block" },
        }}
      />
      {/* Right spear */}
      <Box
        component="img"
        src={spear}
        alt="spear right"
        sx={{
          position: "absolute",
          right: deviceType === "mobile" ? -165 : -500,
          top: 0,
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          width: "100%",
          // display: { xs: "none", md: "block" },
        }}
      />

      <Typography
        variant="body1"
        color="#D4A017"
        sx={{
          fontFamily: "'Nosifer', cursive", // Exact font family with dripping style
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          lineHeight: 2.5, // adjust spacing between lines
          position: "relative",
          zIndex: 1, // bring above spear images if needed
          fontSize:
            deviceType === "mobile"
              ? "8px"
              : deviceType === "tablet"
              ? "18px"
              : "24px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Optional: to enhance dripping effect
        }}
      >
        {poemLines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < poemLines.length - 1 && <br />}
            {/* Add extra spacing via margin if needed */}
          </span>
        ))}
      </Typography>
    </Box>
  );
}