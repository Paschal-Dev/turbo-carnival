import { Typography } from "@mui/material";
import { Box, useMediaQuery, useTheme } from "@mui/system";
import { useState, useEffect } from "react";

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
      
 const poem = `
    IN THE BIRTHPLACE OF GODS, WE SOJOURN
    OF CHARACTER, VIRTUE AND DOMINION, ONLY EAGLES DARE
    MOUNTAINS ABOUND, BUT VICTORY, SAVOUR OF THE BRAVE
    REFINED FOR GREATNESS, STAND FAST, FOR YE ARE GODS
  `;

  return (
    <Box
      sx={{
        mt: deviceType === "mobile" ? 2 : 4,
        p: deviceType === "mobile" ? 2 : 4,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: "10px",
        border: "1px solid",
        borderColor: "primary.main",
        width: deviceType === "mobile" ? "100%" : "90%",
        mx: "auto",
      }}
    >
      <Typography
        variant="body1"
        color="#D4A017"
        fontSize={
          deviceType === "mobile" ? 14 : deviceType === "tablet" ? 18 : 24
        }
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          position: "relative",
          "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            width: "20%",
            height: "2px",
            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="200"><path d="M10 0 L10 200" fill="none" stroke="%23${theme.palette.primary.main.slice(
              1
            )}" stroke-width="2"/></svg>') no-repeat center`,
            transform: "translateY(-50%)",
          },
          "&:before": { left: 0 },
          "&:after": { right: 0 },
        }}
        dangerouslySetInnerHTML={{ __html: poem.replace(/\n/g, "<br />") }}
      />
    </Box>
  );
}