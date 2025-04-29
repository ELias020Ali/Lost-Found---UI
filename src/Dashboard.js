import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import {            ///material UI components
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import api from "./api";      //api client for HTTP requests

function Dashboard() {
  const navigate = useNavigate();
 ////Variables are stated
  const [reports, setReports] = useState([]);  // stores reports
  const [user, setUser] = useState(null);   //stores logged-in data
  const [loading, setLoading] = useState(true); //loading state
  const [error, setError] = useState(null); // stores error messages
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); // stores selected report for viewing details

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")); // will check if user is loggin in vua local storage

        if (!storedUser || !storedUser._id) { // if not it will redirect to the home page
          navigate("/");
          return;
        }

        if (storedUser && storedUser._id) {//fetches user data and their reports
          const userResponse = await api.get(`/api/user/${storedUser._id}`);
          setUser(userResponse.data);
          
          const reportsResponse = await api.get(`/reports?created_by=${storedUser._id}`);
          setReports(reportsResponse.data);
        }
        
        setLoading(false); //data loaded
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, [navigate]); // naviagte redirects

  //delete report function
  const handleDeleteReport = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await api.delete(`/reports/${id}`);
        setReports(reports.filter((report) => report._id !== id));  //update the ui
        alert("Report deleted successfully!");
      } catch (err) {
        console.error("Error deleting report:", err);
        alert("Failed to delete the report. Please try again.");
      }
    }
  };

//open/close report details dialog
  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* User Information Section */}
      {user && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography><strong>First Name:</strong> {user.firstname}</Typography>
              <Typography><strong>Last Name:</strong> {user.lastname}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>User ID:</strong> {user._id}</Typography>
            </Grid>
          </Grid>

          
          {/* user DELETE ACCOUNT  */}
          <Box sx={{ mt: 2 }}>
  <Button
    variant="outlined"
    color="error"
    onClick={async () => {
      const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (!confirm) return;

      try {
        await api.delete(`/api/user/${user._id}`);
        localStorage.removeItem("user");
        alert("Your account has been deleted.");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Failed to delete account. Please try again.");
      }
    }}
  >
    Delete My Account
  </Button>
</Box>
</Paper>
      )}
        {/* User Reports Section */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          background: "linear-gradient(90deg, #46967B, #FFC107)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Your Reports
      </Typography>

      <Grid container spacing={4}>
        {reports.map((report) => (
          <Grid item xs={12} md={4} key={report._id}>
            <Card elevation={3} sx={{ borderRadius: "15px", overflow: "hidden" }}>

            {report.image && (
  <CardMedia
    component="img"
    height="180"
    image={`http://localhost:5000/reports/image/${report._id}`}
    alt={report.item_name}
  />
)}
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {report.item_name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {report.description.length > 100 
                    ? `${report.description.substring(0, 100)}...` 
                    : report.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenDialog(report)}
                  >
                    View Details
                  </Button>

                  <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ mt: 1, ml: 1 }}
                  onClick={() => handleDeleteReport(report._id)}
                  tabIndex={openDialog ? -1 : 0}
                >
                  Delete
                </Button>

                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "15px",
            padding: "20px",
          },
        }}
      >
        {selectedReport && (
          <>
            <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
              {selectedReport.item_name}
            </DialogTitle>
            <DialogContent>
            <CardMedia
    component="img"
    height="300"
    image={`http://localhost:5000/reports/image/${selectedReport._id}`}
    alt={selectedReport.item_name || "No image available"}
    sx={{ objectFit: "cover", borderRadius: "10px" }}
  />


              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Item Type:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedReport.item_type}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Description:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedReport.description}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Location:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedReport.location}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Contact:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedReport.contact}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Posted Date:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {new Date(selectedReport.posted_date).toLocaleString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default Dashboard;