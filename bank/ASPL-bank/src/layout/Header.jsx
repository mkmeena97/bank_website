import { Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      mb={2}
      p={2}
      sx={{
        borderRadius: 1,
        background: "linear-gradient(90deg, rgba(163, 162, 66, 0.5), rgba(133, 67, 9, 0.5), rgba(9, 113, 44, 0.5), rgba(14, 14, 128, 0.5))",
        color: "#4f0c0cff",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        Welcome to ASPL Dashboard
      </Typography>
    </Box>
  );
};

export default Header;
