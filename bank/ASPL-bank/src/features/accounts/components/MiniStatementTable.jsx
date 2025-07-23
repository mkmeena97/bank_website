// src/features/accounts/components/MiniStatementTable.jsx

import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMiniStatement, clearMiniStatement } from '../accountSlice';
import { formatCurrency } from '../accountUtils';

export default function MiniStatementTable({ account, limit = 10 }) {
  const dispatch = useDispatch();
  const { miniStatement, loading, error } = useSelector((state) => state.accounts);

  useEffect(() => {
    if (account?.mobileNumber) {
      dispatch(fetchMiniStatement({ mobileNumber: account.mobileNumber, limit }));
    }
    return () => dispatch(clearMiniStatement());
  }, [account?.mobileNumber, limit, dispatch]);

  if (!account) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary">
          No account selected.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && miniStatement.length === 0 && (
        <Typography color="textSecondary">
          No transactions found.
        </Typography>
      )}

      {!loading && miniStatement.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Related Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {miniStatement.map(tx => (
              <TableRow key={tx.transactionId || Math.random()}>
                <TableCell>
                  {new Date(tx.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {tx.type.charAt(0) + tx.type.slice(1).toLowerCase()}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(tx.amount)}
                </TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>
                  {tx.relatedAccount ? tx.relatedAccount : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
