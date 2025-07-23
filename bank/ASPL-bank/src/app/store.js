// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/accounts/accountSlice';
// import loanReducer from '../features/loans/loanSlice';
// import cardReducer from '../features/cards/cardSlice';

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    // loan: loanReducer,
    // card: cardReducer,
  },
});
