import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./navbar";
import Reports from "./reports";
import Login from "./login";
import Contacts from "./contacts";
import Register from "./Register"
import Dashboard from "./Dashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Home from "./Home"
import AdminReports from "./AdminReports";
import theme from "./theme";
import HomePic from "./Images/HomePic.jpg";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";



function App() {

  const { user } = useAuthContext();
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/reports" element={<Reports />} />
            
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />}/>

            <Route path="/contacts" element={<Contacts />} />

            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/adminlogin" element={!user ? <AdminLogin /> : <Navigate to="/admindashboard" />}/>

            <Route path="/admindashboard" element={<AdminDashboard/>} />
            <Route path="/adminreports" element={<AdminReports/>} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;