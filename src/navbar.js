import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#FFFFFF", 
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          Lost & Found Website
        </Typography>
          </Link>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">

        {!user ? (
  <>
    <Button
      sx={{ textTransform: "none" }}
      variant="outlined"
      color="inherit"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
    <Button
      variant="contained"
      sx={{ backgroundColor: "#66BB6A", textTransform: "none" }}
      onClick={() => navigate("/register")}
    >
      Register
    </Button>
    <Button sx={{ textTransform: "none" }} color="inherit" onClick={() => navigate("/contacts")}>
      Contact
    </Button>
    <Button sx={{ textTransform: "none" }} color="inherit" onClick={() => navigate("/adminlogin")}>
      Admin
    </Button>
  </>
) : (
  <>
    {user?.role === 'admin' ? (
      <>
        <Button
          sx={{ textTransform: "none" }}
          color="inherit"
          onClick={() => navigate("/admindashboard")}
        >
          Admin Dashboard
        </Button>
        <Button
      sx={{ textTransform: "none" }}
      color="inherit"
      onClick={() => navigate("/adminreports")}
    >
      Admin Reports
    </Button>

        <Button
          sx={{ textTransform: "none" }}
          color="inherit"
          onClick={() => navigate("/contacts")}
        >
          Contact
        </Button>
      </>
    ) : (
      <>
        <Button
          sx={{ textTransform: "none" }}
          color="inherit"
          startIcon={<ReportIcon />}
          onClick={() => navigate("/Reports")}
        >
          Reports
        </Button>

        <Button
          sx={{ textTransform: "none" }}
          color="inherit"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          color="inherit"
          onClick={() => navigate("/contacts")}
        >
          Contact
        </Button>
      </>
    )}

    <span>{user.email}</span>
    <IconButton color="inherit" onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  </>
)}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
