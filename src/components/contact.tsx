import { useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { Email, Phone, Home } from "@mui/icons-material";

const Contact = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs")); // Kids' soccer training video
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const response = await fetch("https://formspree.io/f/xblkwkkw", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       email: formData.email,
    //       phone: formData.phone,
    //       message: formData.message,
    //     }),
    //   });
    //   if (response.ok) {
        setSubmissionStatus("success");
        setSubmissionMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
    //   } else {
    //     setSubmissionStatus("error");
    //     setSubmissionMessage("Failed to send message. Please try again.");
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error) {
    //   setSubmissionStatus("error");
    //   setSubmissionMessage("An error occurred. Please try again later.");
    // }
  };

  return (
    <Box
      sx={{ py: mobile ? 4 : 8, bgcolor: "background.default" }}
      id="contact"
    >
      <Container>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mt: mobile ? 4 : 4,
            mb: mobile ? 4 : 6,
            color: "primary.main",
            fontSize: mobile ? "1.5rem" : "2.5rem",
          }}
        >
          Get in Touch
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: mobile ? 2 : 4,
            alignItems: "stretch",
          }}
        >
          <Box sx={{ mb: mobile ? 2 : 4 }}>
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ mb: 2, fontSize: mobile ? "1.2rem" : "1.5rem" }}
            >
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Email sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="body1"
                sx={{ fontSize: mobile ? "0.9rem" : "1rem" }}
              >
                info@goldstreamacademy.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="body1"
                sx={{ fontSize: mobile ? "0.9rem" : "1rem" }}
              >
                +234 91600009598
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Phone sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="body1"
                sx={{ fontSize: mobile ? "0.9rem" : "1rem" }}
              >
                +234 9013612454
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Home sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="body1"
                sx={{ fontSize: mobile ? "0.9rem" : "1rem" }}
              >
                C/O Charles Edeki, S11, Second Floor, Ozde Plaza, 22 Osolo Way,
                Off MM International Airport Road, Ajao Estate, Lagos.
              </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            {submissionStatus && (
              <Alert severity={submissionStatus} sx={{ mb: 2 }}>
                {submissionMessage}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: mobile ? 1 : 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "secondary.main",
                fontSize: mobile ? "0.9rem" : "1rem",
                borderRadius: "8px",
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
