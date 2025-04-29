import React from "react";
import { useState } from "react";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";
import theme from "./theme";
import "./App.css"; 
import { useLogin } from '../src/hooks/useLogin'; 

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>

    <Container maxWidth="sm" className="main-container">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #46967B, #FFC107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Login
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField

              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}

              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Button
            type="submit"
            disabled={isLoading}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            {error && <div className="error">{error}</div>}
      
            {isLoading && <LoadingSpinner />}
      
          </Grid>

        </Grid>
      </Box>
    </Container>
    </form>
  );
}
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <p>Loading...</p>
    </div>
  );
};
export default Auth;