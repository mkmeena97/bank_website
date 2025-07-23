// src/features/accounts/components/TransactionTab.jsx

import React from 'react';
import { Box, Tabs, Tab, Paper, Button } from '@mui/material';
import AddMoneyDialog from './AddMoneyDialog';
import TransferMoneyDialog from './TransferMoneyDialog';
import MiniStatementTable from './MiniStatementTable';

const TransactionTab = ({ account }) => {
  const [active, setActive] = React.useState(0);
  const [addMoneyOpen, setAddMoneyOpen] = React.useState(false);
  const [transferOpen, setTransferOpen] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setActive(newValue);
    setAddMoneyOpen(false);
    setTransferOpen(false);
  };

  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Tabs
        value={active}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Add Money" />
        <Tab label="Transfer" />
        <Tab label="Mini Statement" />
      </Tabs>

      <Box>
        {active === 0 && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddMoneyOpen(true)}
              sx={{ mb: 2 }}
            >
              💰 Add Money
            </Button>
            <AddMoneyDialog
              open={addMoneyOpen}
              onClose={() => setAddMoneyOpen(false)}
              onSuccess={() => setAddMoneyOpen(false)}
              mobileNumber={account.mobileNumber}
            />
          </Box>
        )}

        {active === 1 && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setTransferOpen(true)}
              sx={{ mb: 2 }}
            >
              💸 Transfer Money
            </Button>
            <TransferMoneyDialog
              open={transferOpen}
              onClose={() => setTransferOpen(false)}
              account={account}
            />
          </Box>
        )}

        {active === 2 && <MiniStatementTable account={account} />}
      </Box>
    </Paper>
  );
};

export default TransactionTab;
