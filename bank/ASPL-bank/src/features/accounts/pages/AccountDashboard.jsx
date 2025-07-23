import React from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountByMobile, clearAccount } from '../accountSlice';
import AccountSummaryCard from '../components/AccountSummaryCard';
import AccountTabs from '../components/AccountTabs';
import CreateAccountDialog from '../components/CreateAccountDialog';
import useAuth from '../../../hooks/useAuth';

export default function AccountDashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const userMobile = user?.mobileNumber || '';
  const userEmail = user?.email || '';
  const userName = user?.firstName || user?.username || 'User';

  const { account, loading, error } = useSelector((state) => state.accounts);

  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    if (userMobile && /^[0-9]{10}$/.test(userMobile)) {
      dispatch(fetchAccountByMobile(userMobile));
    }
    return () => dispatch(clearAccount());
  }, [userMobile, dispatch]);

  const handleRefresh = () => {
    if (userMobile && /^[0-9]{10}$/.test(userMobile)) {
      dispatch(fetchAccountByMobile(userMobile));
    }
  };

  return (
    <Box sx={{ maxWidth: 750, mx: 'auto', mt: 4, px: { xs: 1, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        🏦 Account Management Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1">
          Welcome <b>{userName || 'User'}</b>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Mobile: <b>{userMobile}</b> &nbsp;|&nbsp; Email: <b>{userEmail}</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Tooltip title="Refresh account information">
            <span>
              <Button
                variant="outlined"
                size="small"
                disabled={loading}
                onClick={handleRefresh}
              >
                {loading ? <CircularProgress size={18} /> : 'Refresh'}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Paper>

      {loading && !account && (
        <Paper sx={{ p: 2, mt: 2, textAlign: 'center' }}>
          <CircularProgress />
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {account && (
        <>
          <AccountSummaryCard account={account} />
          <AccountTabs account={account} />
        </>
      )}

      {/* If no account, ALWAYS allow to open Create Account dialog */}
      {!loading && !account && (
        <Paper sx={{ p: 2, mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            No account found for this mobile number.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Create Account
          </Button>
          <CreateAccountDialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
              handleRefresh(); // Optional: refresh after creation
            }}
          />
        </Paper>
      )}
    </Box>
  );
}
