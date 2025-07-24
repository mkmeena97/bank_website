import { useContext } from "react";
import { ColorModeContext } from "../context/ThemeContext";
import { useTheme, Typography, Button, Box, Stack, Divider, Paper } from "@mui/material";
import useAuth from "../hooks/useAuth";

const Settings = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { user } = useAuth();

  const handleEditProfile = () => {
    // Redirect to your frontend's profile edit page
    window.location.href = "/edit-profile";
  };

  const handleForgotPassword = () => {
    // Redirect to your custom forgot password flow
    window.location.href = "/forgot-password";
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          ⚙️ Settings
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Logged in as: <strong>{`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "-"}</strong>
        </Typography>


        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Current Theme: <strong>{theme.palette.mode.toUpperCase()}</strong>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={2} direction="row" flexWrap="wrap">
          <Button
            variant="contained"
            color="primary"
            onClick={colorMode.toggleColorMode}
          >
            Toggle Theme
          </Button>

          <Button
            variant="outlined"
            color="info"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
