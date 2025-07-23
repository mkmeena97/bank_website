import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box 
      sx={{ 
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: "linear-gradient(90deg, rgba(163, 162, 66, 0.2), rgba(133, 67, 9, 0.1), rgba(9, 113, 44, 0.1), rgba(14, 14, 128, 0.1))" 
      }}
    >
      <CssBaseline />
      <Navbar />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* For spacing below AppBar */}
          <Header />
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
