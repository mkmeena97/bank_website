// src/features/accounts/accountSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";

// 1. Create Account
export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async (accountData, { rejectWithValue }) => {
    try {
      const res = await api.post("/accounts/api/create", accountData);
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Account created successfully");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Account creation failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Account creation failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 2. Fetch Account by Mobile Number
export const fetchAccountByMobile = createAsyncThunk(
  "accounts/fetchAccountByMobile",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await api.get("/accounts/api/fetch", {
        params: { mobileNumber },
      });
      const data = response.data;
      if (data && data.accountNumber) {
        toast.success("Account loaded successfully");
        return data;
      } else {
        const errorMsg = data?.errorMessage || "Account not found";
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.errorMessage ||
        err.message ||
        "Account fetch failed";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// 3. Add Money
export const addMoney = createAsyncThunk(
  "accounts/addMoney",
  async ({ mobileNumber, amount }, { rejectWithValue }) => {
    try {
      const res = await api.post("/accounts/api/add-money", { mobileNumber, amount });
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Money added");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Add money failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Add money failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 4. Transfer Money
export const transferMoney = createAsyncThunk(
  "accounts/transferMoney",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/accounts/api/transfer", payload);
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Transfer completed");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Transfer failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Transfer failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 5. Mini Statement
export const fetchMiniStatement = createAsyncThunk(
  "accounts/fetchMiniStatement",
  async ({ mobileNumber, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get("/accounts/api/mini-statement", { params: { mobileNumber, limit } });
      if (Array.isArray(res.data)) {
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "No statement");
        return rejectWithValue(res.data.errorMessage || "No statement");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Mini statement fetch failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 6. Balance Inquiry
export const fetchAccountBalance = createAsyncThunk(
  "accounts/fetchAccountBalance",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const res = await api.get("/accounts/api/balance", { params: { mobileNumber } });
      if (res.data.accountNumber) {
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Balance not available");
        return rejectWithValue(res.data.errorMessage || "Balance not available");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Balance inquiry failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 7. Freeze/Unfreeze
export const freezeUnfreezeAccount = createAsyncThunk(
  "accounts/freezeUnfreezeAccount",
  async ({ mobileNumber, action }, { rejectWithValue }) => {
    try {
      const res = await api.put("/accounts/api/freeze-unfreeze", { mobileNumber, action });
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Account status updated");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Freeze/unfreeze failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Freeze/unfreeze failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 8. Change Account Type
export const changeAccountType = createAsyncThunk(
  "accounts/changeAccountType",
  async ({ mobileNumber, newAccountType }, { rejectWithValue }) => {
    try {
      const res = await api.put("/accounts/api/change-type", { mobileNumber, newAccountType });
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Account type updated");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Type update failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Type change failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 9. Update Account
export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async (customerDetailsDto, { rejectWithValue }) => {
    try {
      const res = await api.put("/accounts/api/update", customerDetailsDto);
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Account updated");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Update failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Update failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 10. Delete Account
export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const res = await api.delete("/accounts/api/delete", { params: { mobileNumber } });
      if (res.data.statusCode && res.data.statusCode.startsWith("2")) {
        toast.success(res.data.statusMsg || "Account deleted");
        return res.data;
      } else {
        toast.error(res.data.errorMessage || "Delete failed");
        return rejectWithValue(res.data.errorMessage || "Unknown error");
      }
    } catch (err) {
      const msg =
        err.response?.data?.errorMessage || err.message || "Delete failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// --- Slice definition ---
const initialState = {
  account: null,
  loading: false,
  error: null,
  statusMsg: "",
  miniStatement: [],
  balance: null,
  customerDetails: null,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.statusMsg = "";
      state.error = null;
    },
    clearAccount: (state) => {
      state.account = null;
      state.balance = null;
      state.error = null;
      state.statusMsg = "";
    },
    clearMiniStatement: (state) => {
      state.miniStatement = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createAccount.pending, (state) => { state.loading = true; state.statusMsg = ""; state.error = null; })
      .addCase(createAccount.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(createAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchAccountByMobile.pending, (state) => { state.loading = true; state.error = null; state.statusMsg = ""; })
      .addCase(fetchAccountByMobile.fulfilled, (state, action) => { state.loading = false; state.account = action.payload; })
      .addCase(fetchAccountByMobile.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.account = null; })

      .addCase(addMoney.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addMoney.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(addMoney.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(transferMoney.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(transferMoney.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(transferMoney.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchMiniStatement.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMiniStatement.fulfilled, (state, action) => { state.loading = false; state.miniStatement = action.payload; })
      .addCase(fetchMiniStatement.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.miniStatement = []; })

      .addCase(fetchAccountBalance.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAccountBalance.fulfilled, (state, action) => { state.loading = false; state.balance = action.payload; })
      .addCase(fetchAccountBalance.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.balance = null; })

      .addCase(freezeUnfreezeAccount.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(freezeUnfreezeAccount.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(freezeUnfreezeAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(changeAccountType.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(changeAccountType.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(changeAccountType.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateAccount.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateAccount.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(updateAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteAccount.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteAccount.fulfilled, (state, action) => { state.loading = false; state.statusMsg = action.payload.statusMsg; })
      .addCase(deleteAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    // Add more as needed
  }
});

export const { clearStatus, clearAccount, clearMiniStatement } = accountSlice.actions;
export default accountSlice.reducer;
