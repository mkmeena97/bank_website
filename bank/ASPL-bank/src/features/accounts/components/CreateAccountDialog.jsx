// src/features/accounts/components/CreateAccountDialog.jsx

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import CreateAccountForm from './CreateAccountForm';
import { createAccount, clearStatus } from '../accountSlice';

export default function CreateAccountDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { loading, error, statusMsg } = useSelector((state) => state.accounts);

  // Reset status/message on close
  React.useEffect(() => {
    if (!open) {
      dispatch(clearStatus());
    }
  }, [open, dispatch]);

  const handleSubmit = (values, actions) => {
    dispatch(createAccount(values)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        actions.resetForm();
        if (onClose) onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Account</DialogTitle>
      <DialogContent>
        <CreateAccountForm
          loading={loading}
          error={error}
          statusMsg={statusMsg}
          onSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
