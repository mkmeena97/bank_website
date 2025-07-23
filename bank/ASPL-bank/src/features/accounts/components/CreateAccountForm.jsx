// src/features/accounts/components/CreateAccountForm.jsx

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress
} from '@mui/material';

import { ACCOUNT_TYPES } from '../accountUtils';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(5).max(30).required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  accountType: Yup.string().oneOf(ACCOUNT_TYPES).required('Account type is required'),
  branchAddress: Yup.string().max(200).required('Branch address is required'),
});

const initialValues = {
  name: '',
  email: '',
  mobileNumber: '',
  accountType: ACCOUNT_TYPES[0],
  branchAddress: ''
};

/**
 * @param {Object} props
 * @param {boolean} props.loading - Shows spinner and disables submit
 * @param {string} props.error - Error message
 * @param {string} props.statusMsg - Success message
 * @param {Function} props.onSubmit - Formik submit handler (values, actions)
 */
export default function CreateAccountForm({
  loading = false,
  error = '',
  statusMsg = '',
  onSubmit
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit && onSubmit(values, actions);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting
      }) => (
        <Form>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            margin="normal"
            autoFocus
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            value={values.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobileNumber && Boolean(errors.mobileNumber)}
            helperText={touched.mobileNumber && errors.mobileNumber}
            margin="normal"
          />
          <TextField
            select
            name="accountType"
            label="Account Type"
            fullWidth
            value={values.accountType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.accountType && Boolean(errors.accountType)}
            helperText={touched.accountType && errors.accountType}
            margin="normal"
          >
            {ACCOUNT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="branchAddress"
            label="Branch Address"
            fullWidth
            value={values.branchAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.branchAddress && Boolean(errors.branchAddress)}
            helperText={touched.branchAddress && errors.branchAddress}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || isSubmitting}
              startIcon={loading && <CircularProgress color="inherit" size={18} />}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </Box>
          {statusMsg && (
            <Typography color="success.main" mt={2}>
              {statusMsg}
            </Typography>
          )}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
}
