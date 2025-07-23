// src/features/accounts/pages/CreateAccountPage.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Paper, Box, Button, Typography, CircularProgress, MenuItem, TextField
} from '@mui/material';
import { createAccount, clearStatus } from '../accountSlice';
import { ACCOUNT_TYPES } from '../accountUtils';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(5).max(30),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required('Mobile is required'),
  accountType: Yup.string().oneOf(ACCOUNT_TYPES).required('Account type required'),
  branchAddress: Yup.string().required('Branch address is required').max(200),
});

const initialValues = {
  name: '',
  email: '',
  mobileNumber: '',
  accountType: ACCOUNT_TYPES[0],
  branchAddress: ''
};

export default function CreateAccountPage() {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);

  // Clear status and error on mount/unmount
  React.useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} style={{ padding: 32, minWidth: 380, maxWidth: 425 }}>
        <Typography variant="h5" mb={2}>
          Create New Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            dispatch(createAccount(values)).then((action) => {
              if (action.meta.requestStatus === 'fulfilled') {
                resetForm();
              }
            });
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
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
                error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                helperText={touched.mobileNumber && errors.mobileNumber}
                margin="normal"
              />
              <TextField
                name="accountType"
                label="Account Type"
                select
                fullWidth
                value={values.accountType}
                onChange={handleChange}
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
                error={touched.branchAddress && Boolean(errors.branchAddress)}
                helperText={touched.branchAddress && errors.branchAddress}
                margin="normal"
              />

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                  startIcon={loading && <CircularProgress color="inherit" size={18} />}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </Box>

              {statusMsg && (
                <Typography color="success.main" mt={2}>
                  {statusMsg}
                </Typography>
              )}
              {error && (
                <Typography color="error" mt={2}>{error}</Typography>
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
