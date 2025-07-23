// src/features/accounts/accountUtils.js

// Format account number as 12-digit string with leading zeros
export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  return accountNumber.toString().padStart(12, '0');
};

// Format currency (INR)
export const formatCurrency = (amount) =>
  amount !== undefined && amount !== null
    ? `₹ ${parseFloat(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '₹ 0.00';

// Mask mobile (show only last 4 digits)
export const maskMobileNumber = (mobile) =>
  mobile && mobile.length === 10
    ? `******${mobile.slice(-4)}`
    : mobile;

// Title-case account type
export const formatAccountType = (type) =>
  (type || '')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

// Lists of allowed types/statuses
export const ACCOUNT_TYPES = ['SAVINGS', 'CURRENT', 'SALARY', 'NRI'];
export const ACCOUNT_TYPE_LABELS = {
  SAVINGS: 'Savings',
  CURRENT: 'Current',
  SALARY: 'Salary',
  NRI: 'NRI',
};
export const ACCOUNT_STATUS = ['ACTIVE', 'FROZEN'];

// Validate 10-digit mobile number
export function validateMobileNumber(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

// Validate money amount (> 0, up to 2 decimal places)
export function validateAmount(amount) {
  return typeof amount === 'number' &&
         amount > 0 &&
         /^\d+(\.\d{1,2})?$/.test(amount.toString());
}

// Validate account number (must be 12 digits)
export function validateAccountNumber(accountNumber) {
  return typeof accountNumber === 'string' &&
         /^[0-9]{12}$/.test(accountNumber);
}

// Parse and return error message string from error API response
export function extractApiError(error) {
  if (!error) return "An unknown error occurred";
  if (typeof error === 'string') return error;
  if (error.errorMessage) return error.errorMessage;
  if (error.statusMsg) return error.statusMsg;
  if (error.message) return error.message;
  return "An unknown error occurred";
}

// Example: Determine if the API response is a "success"
export function isApiSuccess(res) {
  // Accepts {statusCode: "200"} or {statusCode: "201"}
  return res && (res.statusCode === "200" || res.statusCode === "201");
}
