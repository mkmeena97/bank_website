// src/features/accounts/components/SettingsTab.jsx

import React from 'react';
import { Box, Typography, Paper, Divider, Button, Stack } from '@mui/material';
import FreezeToggleButton from './FreezeToggleButton';
import ChangeAccountTypeForm from './ChangeAccountTypeForm';
import UpdateAccountForm from './UpdateAccountForm';
import DeleteAccountDialog from './DeleteAccountDialog';

export default function SettingsTab({ account }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  if (!account) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Please select an account to manage settings.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 1, p: 3 }}>
      {/* Freeze/Unfreeze Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          Freeze / Unfreeze Account
        </Typography>
        <FreezeToggleButton account={account} />
      </Box>
      <Divider />

      {/* Change Account Type Section */}
      <Box my={3}>
        <Typography variant="subtitle1" gutterBottom>
          Change Account Type
        </Typography>
        <ChangeAccountTypeForm account={account} />
      </Box>
      <Divider />

      {/* Update Account Info Section */}
      <Box my={3}>
        <Typography variant="subtitle1" gutterBottom>
          Update Account Info
        </Typography>
        <UpdateAccountForm account={account} />
      </Box>
      <Divider />

      {/* Delete Account Section */}
      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom color="error">
          Danger Zone — Delete Account
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Stack>
        <DeleteAccountDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          account={account}
        />
      </Box>
    </Paper>
  );
}
