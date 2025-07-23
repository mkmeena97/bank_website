// src/features/accounts/components/FreezeToggleButton.jsx

import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { freezeUnfreezeAccount, clearStatus } from '../accountSlice';

export default function FreezeToggleButton({ account }) {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);

  const isFrozen =
    String(account?.status || '').toUpperCase() === 'FROZEN';

  React.useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  const handleClick = () => {
    if (!account) return;
    dispatch(
      freezeUnfreezeAccount({
        mobileNumber: account.mobileNumber,
        action: isFrozen ? 'UNFREEZE' : 'FREEZE'
      })
    );
  };

  return (
    <Box>
      <Button
        variant="contained"
        color={isFrozen ? 'success' : 'warning'}
        onClick={handleClick}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : isFrozen ? <LockOpenIcon /> : <AcUnitIcon />}
      >
        {loading
          ? isFrozen
            ? 'Unfreezing...'
            : 'Freezing...'
          : isFrozen
          ? 'Unfreeze Account'
          : 'Freeze Account'}
      </Button>
      {statusMsg && (
        <Box color="success.main" mt={1}>
          {statusMsg}
        </Box>
      )}
      {error && (
        <Box color="error.main" mt={1}>
          {error}
        </Box>
      )}
    </Box>
  );
}
