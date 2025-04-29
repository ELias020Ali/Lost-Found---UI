import React, { useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider, TextField, Button, Snackbar } from "@mui/material";
import emailjs from "emailjs-com"; 
import theme from "./theme"; 
import "./App.css"; 

function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send("service_410vvos", "template_onyyr0j", templateParams, "kRJdXdNBhEKSyn9cJ")
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          setSnackbarMessage("Your message has been sent successfully!");
          setSnackbarOpen(true);
        },
        (err) => {
          console.error("FAILED...", err);
          setSnackbarMessage("Something went wrong. Please try again.");
          setSnackbarOpen(true);
        }
      );
  };


  return (
    <Container maxWidth="md" className="main-container">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg, #46967B, #FFC107)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Contact Us
      </Typography>

      {/* Contact Form */}
      <Typography variant="h5" gutterBottom>
        Send Us a Message
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Send Message
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default Contacts;
