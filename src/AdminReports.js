import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import theme from "./theme"; 
import "./App.css"; 
import api from "./api"; 
import axios from "axios";

function AdminReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showCard, setShowCard] = useState(true);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    item_type: "",
    description: "",
    location: "",
    contact: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null); 
  const API_URL = "http://localhost:5000/reports";
  
  const [itemNameFilter, setItemNameFilter] = useState("");
  const [itemTypeFilter, setItemTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const handleOkClick = () => {
    setShowCard(false);
  };

  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(API_URL);
        setReports(res.data);

      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReports = reports.filter((report) => {
    const matchesItemName = itemNameFilter === "" || 
      (report.item_name || "").toLowerCase().includes(itemNameFilter.toLowerCase());
    
    const matchesItemType = itemTypeFilter === "" || 
      (report.item_type || "").toLowerCase().includes(itemTypeFilter.toLowerCase());
    
    const matchesLocation = locationFilter === "" || 
      (report.location || "").toLowerCase().includes(locationFilter.toLowerCase());
    

      const matchesSearchQuery = searchQuery === "" || 
      (report.item_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.item_type || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.location || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesItemName && matchesItemType && matchesLocation && matchesSearchQuery;
  });


  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const handleCreateReportClick = () => {
    setIsCreateFormOpen(true);
  };

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
    setFormData({ item_name: "", item_type: "", description: "", location: "", contact: "", image: "" }); // Reset form
    setImageFile(null); // Reset image file
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file in state
    }
  };


  const handleSubmit = async () => {
    try {
      const formDataReport = new FormData();
      formDataReport.append("item_name", formData.item_name);
      formDataReport.append("item_type", formData.item_type);
      formDataReport.append("description", formData.description);
      formDataReport.append("location", formData.location);
      formDataReport.append("contact", formData.contact);
      
      // Get the logged-in user
      const user = JSON.parse(localStorage.getItem("user"));
      formDataReport.append("created_by", user?._id);
  
      // Append the image if available
      if (imageFile) {
        formDataReport.append("image", imageFile);
      }
  
      const response = await api.post("/reports", formDataReport, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setReports([response.data, ...reports]);
      handleCloseCreateForm();
    } catch (err) {
      console.error("Error creating report:", err);
      alert("Failed to create report. Please try again.");
    }
  };
  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    
    <Container maxWidth="lg" className="main-container"
    aria-hidden={openDialog || isCreateFormOpen ? "true" : "false"}
>

  {/* Conditionally render the card */}
  {showCard && (
    <Card sx={{ mt: 4, mb: 4, padding: 0, backgroundColor: "#f4f4f4", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="body1">
          We are not liable if you contact a user and face issues dealing with them.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleOkClick}>
            OK
          </Button>
        </Box>
      </CardContent>
    </Card>
  )}



        {/* Item Name Filter */}
        <TextField
          label="Filter by item name"
          variant="outlined"
          value={itemNameFilter}
          onChange={(e) => setItemNameFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 350, mb: 2 }}
        />

        {/* Item Type Filter */}
        <TextField
          label="Filter by item type"
          variant="outlined"
          value={itemTypeFilter}
          onChange={(e) => setItemTypeFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 350, mb: 2 }}
        />

        {/* Location Filter */}
        <TextField
          label="Filter by location"
          variant="outlined"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 350, mb: 4 }}
          
        />

      {/* Create Report Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mb: 4 }}
        onClick={handleCreateReportClick}
      >
        Create Report
      </Button>

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
        Recent Reports
      </Typography>

      {/* Report Cards */}
      <Grid container spacing={4}>
        {filteredReports.map((report) => (
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
                  {report.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenDialog(report)}
                >
                  View Details
                </Button>

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
  disableEnforceFocus
  PaperProps={{
    sx: {
      borderRadius: "15px",
      padding: "20px",
    },
  }}
>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          {selectedReport?.item_name}
        </DialogTitle>
        <DialogContent>
          
          {selectedReport && (
            <CardMedia
            component="img"
            height="300"
            image={`http://localhost:5000/reports/image/${selectedReport._id}`}
            alt={selectedReport.item_name || "No image available"}
            sx={{ objectFit: "cover", borderRadius: "10px" }}
          />
        )}


          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Item Type:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedReport?.item_type}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Description:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedReport?.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Location:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedReport?.location}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Contact:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedReport?.contact}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Posted Date:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {new Date(selectedReport?.posted_date).toLocaleString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
  open={isCreateFormOpen}
  onClose={handleCloseCreateForm}
  maxWidth="md"
  fullWidth
  disableEnforceFocus
  PaperProps={{
    sx: {
      borderRadius: "15px",
      padding: "20px",
    },
  }}
>
  
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>Create Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            name="item_name"
            value={formData.item_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item Type"
            name="item_type"
            value={formData.item_type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            multiline
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            multiline
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminReports;
