import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body1">
        This is the main dashboard. You can view your account summary, card details, and more here.
      </Typography>
    </Box>
  );
};

export default Home;
