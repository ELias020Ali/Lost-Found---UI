import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import api from "./api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); 
  const [filtered, setFiltered] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState(null); 

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token 
    : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user", {   
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    const filteredData = users.filter((user) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();  
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFiltered(filteredData);
  }, [searchQuery, users]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        Admin Dashboard
      </Typography>

      {/* Search */}
      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterAltIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      {/* Error */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}
      
      <h2>Accounts</h2>
      
{/* User Cards */}
<Grid container spacing={4}>
  {filtered.map((user) => (
    <Grid item xs={12} md={4} key={user._id}>
      <Card elevation={3} sx={{ borderRadius: "15px" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Full Name: {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Email: {user.email}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Password: {user.password}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              const confirm = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
              if (!confirm) return;

              try {
                await api.delete(`/api/user/${user._id}`);
                alert("User has been deleted successfully.");
              } catch (err) {
                console.error(err);
                alert("Failed to delete user. Please try again.");
              }
            }}
            sx={{ mt: 2 }}
          >
            Delete User
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}

        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1">
                No users matched your search.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
