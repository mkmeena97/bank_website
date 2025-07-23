import { useKeycloak } from "@react-keycloak/web";
import { Box, Typography, Paper, Avatar } from "@mui/material";

const Profile = () => {
  const { keycloak } = useKeycloak();
  const userInfo = keycloak?.tokenParsed;
  console.log(userInfo);

  return (
    <Box 
      p={3}
      sx={{
        background: "linear-gradient(90deg, rgba(163, 162, 66, 0.2), rgba(133, 67, 9, 0.1), rgba(9, 113, 44, 0.1), rgba(14, 14, 128, 0.1))",
        minHeight: "100vh", // optional: full page height
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>

      {userInfo ? (
        <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 400 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {userInfo?.preferred_username?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography variant="h6">
              {userInfo?.preferred_username}
            </Typography>
          </Box>

          <Typography variant="body1"><strong>Name:</strong> {userInfo.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
          <Typography variant="body1"><strong>Username:</strong> {userInfo.preferred_username}</Typography>
          <Typography variant="body1"><strong>Realm:</strong> {userInfo.iss}</Typography>
          <Typography variant="body1"><strong>Mobile Number:</strong> {userInfo.mobileNumber}</Typography>
          <Typography variant="body1"><strong>Roles:</strong> {userInfo.realm_access?.roles?.join(", ")}</Typography>
        </Paper>
      ) : (
        <Typography variant="body1">User info not available.</Typography>
      )}
    </Box>
  );
};

export default Profile;
