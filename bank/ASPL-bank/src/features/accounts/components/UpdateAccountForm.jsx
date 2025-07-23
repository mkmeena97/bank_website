// src/features/accounts/components/UpdateAccountForm.jsx

import React from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount, clearStatus } from '../accountSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(5).max(30).required('Name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  branchAddress: Yup.string().max(200).required('Branch address required'),
  // Other fields if allowed
});

export default function UpdateAccountForm({ account }) {
  const dispatch = useDispatch();
  const { loading, statusMsg, error } = useSelector((state) => state.accounts);

  const [values, setValues] = React.useState({
    name: account?.name || '',
    email: account?.email || '',
    branchAddress: account?.branchAddress || ''
  });
  const [touched, setTouched] = React.useState({});
  const [fieldErrors, setFieldErrors] = React.useState({});

  React.useEffect(() => {
    setValues({
      name: account?.name || '',
      email: account?.email || '',
      branchAddress: account?.branchAddress || ''
    });
    setTouched({});
    setFieldErrors({});
  }, [account]);

  React.useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  const handleChange = (e) => {
    setValues(v => ({
      ...v,
      [e.target.name]: e.target.value
    }));
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  // Simple field-level validation on blur/submit
  const validate = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err.inner) {
        const errs = {};
        for (const e of err.inner) {
          errs[e.path] = e.message;
        }
        setFieldErrors(errs);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    dispatch(updateAccount({
      ...account,
      ...values
      // If nested accountsDto is needed, adjust accordingly
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2} mt={1} mb={1}>
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.name && (fieldErrors.name))}
          helperText={touched.name && fieldErrors.name}
          disabled={loading}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && (fieldErrors.email))}
          helperText={touched.email && fieldErrors.email}
          disabled={loading}
          fullWidth
        />
        <TextField
          label="Branch Address"
          name="branchAddress"
          value={values.branchAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.branchAddress && (fieldErrors.branchAddress))}
          helperText={touched.branchAddress && fieldErrors.branchAddress}
          disabled={loading}
          fullWidth
        />
        {/* Expand here for other fields if needed */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
        {statusMsg && (
          <Box color="success.main">{statusMsg}</Box>
        )}
        {error && (
          <Box color="error.main">{error}</Box>
        )}
      </Box>
    </form>
  );
}
