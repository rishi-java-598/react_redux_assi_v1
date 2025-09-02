import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import policiesSlice from './slices/policiesSlice';
import claimsSlice from './slices/claimSlice';
import paymentsSlice from './slices/paymentSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    policies: policiesSlice,
    claims: claimsSlice,
    payments: paymentsSlice,
    users: usersSlice,
  },
});

export default store;
