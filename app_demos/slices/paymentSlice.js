import { createSlice } from '@reduxjs/toolkit';

const demoData = [
  {
    id: '1',
    amount: 1200,
    date: '2024-08-01',
    status: 'Completed',
    policyId: '1',
    customerId: '1',
    type: 'Premium Payment',
  },
  {
    id: '2',
    amount: 800,
    date: '2024-08-05',
    status: 'Completed',
    policyId: '2',
    customerId: '1',
    type: 'Premium Payment',
  },
  {
    id: '3',
    amount: 600,
    date: '2024-08-10',
    status: 'Pending',
    policyId: '3',
    customerId: '3',
    type: 'Premium Payment',
  },
];

const initialState = {
  payments: demoData,
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    updatePayment: (state, action) => {
      const index = state.payments.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
  },
});

export const { setPayments, addPayment, updatePayment } = paymentsSlice.actions;
export default paymentsSlice.reducer;
