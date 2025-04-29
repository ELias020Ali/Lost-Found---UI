import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import HomePic from "./Images/HomePic.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" className="main-container">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card elevation={6} className="text-card">
              <CardContent>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(90deg, #46967B, #FFC107)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    animation: "fadeIn 2s ease-in-out",
                  }}
                >
                  <SearchIcon sx={{ mr: 1 }} /> Find Your Lost Items or Pets
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  Connect with the community to report lost and found items, including pets.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={6} className="image-card">
              <CardMedia
                component="img"
                src={HomePic}
                alt="Lost and Found"
                className="hero-image"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box className="section-container" sx={{ py: 8, backgroundColor: "#F8F9FA" }}>
        <Container maxWidth="lg">
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
            How It Works
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {[
              { title: "Step 1: Report", text: "Submit a report with details about the lost or found item." },
              { title: "Step 2: Search", text: "Do your due diligence and search the reports" },
              { title: "Step 3: Reunite", text: "Get in touch with the owner or finder to reunite the item." },
            ].map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card elevation={3} sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">{step.title}</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>{step.text}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box className="section-container" sx={{ py: 8 }}>
        <Container maxWidth="lg">
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
            Featured Stories
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold">Max the Dog Reunited with Family</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  After being lost for 3 days, Max was found thanks to a community report.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold">Lost Wallet Returned to Owner</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  A kind stranger found and reported a lost wallet, reuniting it with its owner.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="cta-section" sx={{ py: 8, backgroundColor: "#46967B", color: "white", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", animation: "fadeIn 2s ease-in-out" }}
          >
            Ready to Get Started?
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "white" }}>
            Join our community and help reunite lost items and pets with their owners.
          </Typography>

          <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/register")}>
            Register Now
          </Button>
        </Container>
      </Box>

      <Box className="footer" />
    </>
  );
};

export default Home;
