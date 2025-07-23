import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#f4f4f4",
        textAlign: "center"
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} TezBank. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
