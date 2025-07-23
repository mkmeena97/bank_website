import { useContext } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { ColorModeContext } from "../context/ThemeContext";
import {
  useTheme,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Paper,
} from "@mui/material";

const Settings = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { keycloak } = useKeycloak();

  const realm = keycloak.realm || "aspl-realm";
  const baseUrl = keycloak.authServerUrl?.replace(/\/$/, "") || "http://localhost:8080";
  const referrer = "React-app";
  const referrerUri = encodeURIComponent(window.location.origin + "/settings");

  const accountUrl = `${baseUrl}/realms/${realm}/account?referrer=${referrer}&referrer_uri=${referrerUri}`;
  const passwordResetUrl = `${baseUrl}/realms/${realm}/account/account-security/signing-in?referrer=${referrer}&referrer_uri=${referrerUri}`;

  const handleEditProfile = () => {
    window.location.href = accountUrl;
  };

  const handleForgotPassword = () => {
    window.location.href = passwordResetUrl;
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          ⚙️ Settings
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
