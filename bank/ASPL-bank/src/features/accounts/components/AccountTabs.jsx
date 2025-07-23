// src/features/accounts/components/AccountTabs.jsx

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TransactionTab from './TransactionTab';
import SettingsTab from './SettingsTab';

const AccountTabs = ({ account }) => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        sx={{ mb: 2 }}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="🔄 Transactions" />
        <Tab label="⚙️ Settings" />
      </Tabs>

      <Box>
        {tab === 0 && <TransactionTab account={account} />}
        {tab === 1 && <SettingsTab account={account} />}
      </Box>
    </Box>
  );
};

export default AccountTabs;
