// src/features/accounts/components/ChangeAccountTypeForm.jsx

import React from 'react';
import { Box, TextField, MenuItem, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAccountType, clearStatus } from '../accountSlice';
import { ACCOUNT_TYPES } from '../accountUtils';

export default function ChangeAccountTypeForm({ account }) {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);
  const [type, setType] = React.useState(account?.accountType || '');

  React.useEffect(() => {
    setType(account?.accountType || '');
  }, [account]);

  React.useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || type === account.accountType) return;
    dispatch(changeAccountType({ mobileNumber: account.mobileNumber, newAccountType: type }));
  };

  if (!account) {
    return <Typography color="error">No account selected</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" gap={2} alignItems="center" mt={1}>
        <TextField
          select
          label="Account Type"
          value={type}
          onChange={e => setType(e.target.value)}
          size="small"
          disabled={loading}
        >
          {ACCOUNT_TYPES.map(opt => (
            <MenuItem
              key={opt}
              value={opt}
              disabled={opt === account.accountType}
            >
              {opt.charAt(0) + opt.slice(1).toLowerCase()}
              {opt === account.accountType ? ' (Current)' : ''}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !type || type === account.accountType}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Updating...' : 'Change'}
        </Button>
      </Box>
      {statusMsg && (
        <Box color="success.main" mt={1}>{statusMsg}</Box>
      )}
      {error && (
        <Box color="error.main" mt={1}>{error}</Box>
      )}
    </form>
  );
}
