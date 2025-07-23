import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(90deg, rgba(163, 162, 66, 0.8), rgba(133, 67, 9, 0.8), rgba(9, 113, 44, 0.8), rgba(14, 14, 128, 0.8))",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://media.licdn.com/dms/image/v2/D4E0BAQHqRaoz3KZkSA/company-logo_200_200/company-logo_200_200/0/1712411291281?e=1755734400&v=beta&t=rYOHn2kqVpaBrdVOlzDIBqVszVLSjVVgeRCTcVjTQxE"
            alt="ASPL Logo"
            style={{ height: 40, width: 40, borderRadius: "50%" }}
          />
          <Typography variant="h6" noWrap component="div">
            ASPL
          </Typography>
        </Box>
        <Box>
          <AccountCircleIcon fontSize="large" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
