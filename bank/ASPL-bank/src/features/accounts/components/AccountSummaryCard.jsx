// src/features/accounts/components/AccountSummaryCard.jsx

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { formatAccountNumber, formatCurrency, formatAccountType } from '../accountUtils';

export default function AccountSummaryCard({ account }) {
  if (!account) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            No account selected
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const status = String(account.status || "ACTIVE").toUpperCase();

  return (
    <Card sx={{ minWidth: 300, mb: 2, boxShadow: 3 }}>
      <CardContent>
        {/* Header Row */}
        <Box display="flex" alignItems="center" mb={1}>
          <AccountBalanceWalletIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {account.name || <AccountCircleIcon sx={{ fontSize: 20 }} />}
          </Typography>
          <Box flexGrow={1} />
          <Chip
            size="small"
            label={status}
            color={status === 'ACTIVE' ? "success" : "warning"}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Account Fields */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center">
            <CreditCardIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography variant="body2" sx={{ minWidth: 120 }}>Account #:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatAccountNumber?.(account.accountNumber) ?? account.accountNumber}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ minWidth: 120 }}>Account Type:</Typography>
            <Typography variant="body2">{formatAccountType?.(account.accountType) ?? account.accountType}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ minWidth: 120 }}>Branch:</Typography>
            <Typography variant="body2">{account.branchAddress || "-"}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ minWidth: 120 }}>Mobile:</Typography>
            <Typography variant="body2">{account.mobileNumber || "-"}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ minWidth: 120 }}>Email:</Typography>
            <Typography variant="body2">{account.email || "-"}</Typography>
          </Box>
        </Box>

        {/* Balance */}
        <Divider sx={{ my: 1 }} />
        <Box textAlign="right">
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            {formatCurrency?.(account.balance) ?? account.balance}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Available Balance
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
