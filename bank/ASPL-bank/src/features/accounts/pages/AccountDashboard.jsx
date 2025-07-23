// src/features/accounts/pages/AccountDashboard.jsx
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
import { useKeycloak } from '@react-keycloak/web';

export default function AccountDashboard() {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();

  const userDetails = keycloak?.tokenParsed || {};
  let userMobile = '';
  if (Array.isArray(userDetails.mobileNumber) && userDetails.mobileNumber.length) {
    userMobile = userDetails.mobileNumber[0];
  } else if (typeof userDetails.mobileNumber === 'string') {
    userMobile = userDetails.mobileNumber;
  } else if (userDetails.phone_number) {
    userMobile = userDetails.phone_number;
  } else if (userDetails.preferred_username) {
    userMobile = userDetails.preferred_username;
  }
  const userEmail = userDetails.email || '';
  const userName = userDetails.name || userDetails.given_name || '';

  const { account, loading, error } = useSelector((state) => state.accounts);

  React.useEffect(() => {
    if (userMobile && /^[0-9]{10}$/.test(userMobile)) {
      dispatch(fetchAccountByMobile(userMobile));
    } else {
      console.warn('Invalid or missing mobile number for account fetch:', userMobile);
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

      {!loading && !account && !error && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            No account found for this mobile number. Please create one or contact support.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
