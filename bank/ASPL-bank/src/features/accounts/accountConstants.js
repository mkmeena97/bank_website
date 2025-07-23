// src/features/accounts/accountConstants.js

// Status Codes and Default Messages
export const STATUS_CODE = {
  CREATED: '201',
  OK: '200',
  UPDATED: '200',
  DELETED: '200',
  FAILED: '500',
  NOT_FOUND: '404',
  VALIDATION_FAILED: '400'
};

export const STATUS_MSG = {
  CREATED: 'Account created successfully',
  UPDATED: 'Account details updated successfully',
  DELETED: 'Account deleted successfully',
  ADDED_MONEY: 'Money added successfully',
  TRANSFER_COMPLETED: 'Transfer completed',
  ACCOUNT_TYPE_UPDATED: 'Account type updated',
  ACCOUNT_STATUS_UPDATED: 'Account status updated',
  FETCH_SUCCESS: 'Account fetched successfully',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Account Types (as constants or for dropdowns)
export const ACCOUNT_TYPE = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT',
  SALARY: 'SALARY',
  NRI: 'NRI'
};

export const ACCOUNT_TYPE_LABELS = {
  SAVINGS: 'Savings',
  CURRENT: 'Current',
  SALARY: 'Salary',
  NRI: 'NRI'
};

// Account Status
export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN'
};

// Freeze/Unfreeze Actions
export const ACCOUNT_ACTION = {
  FREEZE: 'FREEZE',
  UNFREEZE: 'UNFREEZE'
};

// API Paths (for documentation, not required for fetch)
export const API_PATH = {
  CREATE: '/accounts/api/create',
  FETCH: '/accounts/api/fetch',
  ADD_MONEY: '/accounts/api/add-money',
  TRANSFER: '/accounts/api/transfer',
  MINI_STATEMENT: '/accounts/api/mini-statement',
  BALANCE: '/accounts/api/balance',
  FREEZE_UNFREEZE: '/accounts/api/freeze-unfreeze',
  CHANGE_TYPE: '/accounts/api/change-type',
  UPDATE: '/accounts/api/update',
  DELETE: '/accounts/api/delete'
};

// Field Names (for form validation, mapping, etc.)
export const FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  MOBILE_NUMBER: 'mobileNumber',
  ACCOUNT_NUMBER: 'accountNumber',
  ACCOUNT_TYPE: 'accountType',
  BRANCH_ADDRESS: 'branchAddress',
  BALANCE: 'balance',
  STATUS: 'status'
};
