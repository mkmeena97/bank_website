// src/features/accounts/components/DeleteAccountDialog.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, clearStatus } from '../accountSlice';

export default function DeleteAccountDialog({ open, onClose, account }) {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);

  React.useEffect(() => {
    if (!open) dispatch(clearStatus());
  }, [open, dispatch]);

  // Close after success
  React.useEffect(() => {
    if (statusMsg && open && !loading) {
      setTimeout(() => {
        onClose && onClose();
      }, 1200);
    }
    // eslint-disable-next-line
  }, [statusMsg, loading, open]);

  if (!account) return null;

  const handleDelete = () => {
    dispatch(deleteAccount(account.mobileNumber));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Account?</DialogTitle>
      <DialogContent>
        <DialogContentText color="error">
          This action cannot be undone. <br />
          Are you sure you want to delete the account for:
        </DialogContentText>
        <Box mt={2} mb={1}>
          <strong>{account.name}</strong>
          <br />
          Account #: <strong>{account.accountNumber}</strong>
          <br />
          Mobile: <strong>{account.mobileNumber}</strong>
        </Box>
        {statusMsg && (
          <Box color="success.main" mb={1}>{statusMsg}</Box>
        )}
        {error && (
          <Box color="error.main" mb={1}>{error}</Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
