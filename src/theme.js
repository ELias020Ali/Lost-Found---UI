// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#46967B",
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "#F8F9FA", 
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h3: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    body1: {
      fontSize: "1.1rem",
      color: "#555",
    },
  },
});

export default theme;