import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useAdminLogin } from '../src/hooks/useAdminLogin';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAdminLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <Container maxWidth="sm" className="main-container">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #0F2027, #203A43, #2C5364)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            Admin Login
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                label="Admin Email"
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
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {error && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default AdminLogin;
