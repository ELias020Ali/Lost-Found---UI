import React from "react";
import { useState } from "react"; 
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";
import theme from "./theme"; 
import "./App.css"; 
import { useSignup } from './hooks/useSignup'
import { useNavigate } from "react-router-dom"; 
function Register() {
    // states for the field inputs
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstname, lastname, email, password) 
    }

  return (
    <form className="signup" onSubmit={handleSubmit}>

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
          Register
        </Typography>
        <Grid container spacing={4}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              type="firstname" 
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              type="lastname" 
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            />
            <TextField
              fullWidth
              label="Email"
              type="email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="outlined"
              margin="normal"
            />
            <Button
            type="submit"
            disabled={isLoading}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            {error && <div className="error">{error}</div>} 
          </Grid>
        </Grid>
      </Box>
    </Container>
    </form>
  );
}

export default Register;