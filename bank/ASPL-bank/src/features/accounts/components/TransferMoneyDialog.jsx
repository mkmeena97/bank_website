import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, TextField, CircularProgress, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { transferMoney, clearStatus } from '../accountSlice';

export default function TransferMoneyDialog({ open, onClose, account }) {
  const dispatch = useDispatch();
  const { loading, error, statusMsg } = useSelector((state) => state.accounts);

  const [toMobile, setToMobile] = useState('');
  const [amount, setAmount] = useState('');

  // ✅ Reset on dialog open
  useEffect(() => {
    if (open) {
      setToMobile('');
      setAmount('');
      dispatch(clearStatus());
    }
  }, [open, dispatch]);

  // ✅ Close dialog on success
  useEffect(() => {
    if (statusMsg && open && !loading) {
      const timeout = setTimeout(() => {
        onClose?.();
        dispatch(clearStatus()); // reset msg after closing
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [statusMsg, loading, open, dispatch, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !toMobile ||
      !/^[0-9]{10}$/.test(toMobile) ||
      !amount ||
      isNaN(amount) ||
      Number(amount) <= 0
    ) return;

    dispatch(transferMoney({
      fromMobileNumber: account.mobileNumber,
      toMobileNumber: toMobile,
      amount: Number(amount)
    }));
  };

  if (!account) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Transfer Money
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="To Mobile Number"
              name="toMobile"
              fullWidth
              value={toMobile}
              onChange={e => setToMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              required
              inputProps={{ maxLength: 10 }}
              margin="dense"
              placeholder="Recipient's mobile (10 digits)"
            />
            <TextField
              label="Amount"
              name="amount"
              fullWidth
              type="number"
              inputProps={{ min: 1, step: '0.01' }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              margin="dense"
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
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              loading ||
              !toMobile ||
              !/^[0-9]{10}$/.test(toMobile) ||
              !amount ||
              Number(amount) <= 0
            }
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {loading ? 'Transferring...' : 'Transfer Money'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
