// src/features/accounts/components/AddMoneyDialog.jsx

import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, TextField, CircularProgress, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney, clearStatus } from '../accountSlice';

export default function AddMoneyDialog({ open, onClose, onSuccess, mobileNumber }) {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);
  const [amount, setAmount] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      dispatch(clearStatus());
      setAmount('');
    }
  }, [open, dispatch]);

  React.useEffect(() => {
    if (statusMsg && !loading && open) {
      setTimeout(() => {
        onClose?.();
        onSuccess?.();
      }, 1000);
    }
  }, [statusMsg, loading, open, onClose, onSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) < 1) return;
    dispatch(addMoney({ mobileNumber, amount: parseFloat(amount) }));
  };

  if (!mobileNumber) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Add Money
        <IconButton onClick={onClose} edge="end" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Amount (INR)"
              name="amount"
              fullWidth
              type="number"
              inputProps={{ min: 1, step: '0.01' }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              autoFocus
            />
          </Box>

          {statusMsg && (
            <Box color="success.main" mb={1}>
              {statusMsg}
            </Box>
          )}
          {error && (
            <Box color="error.main" mb={1}>
              {error}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={loading}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !amount || Number(amount) < 1}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {loading ? 'Processing...' : 'Add Money'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
