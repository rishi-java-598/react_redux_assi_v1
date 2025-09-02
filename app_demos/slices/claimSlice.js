import { createSlice } from '@reduxjs/toolkit';

const demoData = [
  {
    id: '1',
    claimNumber: 'CLM-001',
    policyId: '1',
    amount: 5000,
    status: 'Pending',
    description: 'Medical expenses claim',
    dateSubmitted: '2024-08-15',
    customerId: '1',
  },
  {
    id: '2',
    claimNumber: 'CLM-002',
    policyId: '2',
    amount: 3000,
    status: 'Approved',
    description: 'Car accident claim',
    dateSubmitted: '2024-07-20',
    customerId: '3',
  },
];

const initialState = {
  claims: demoData,
  loading: false,
  error: null,
  searchTerm: '',
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    setClaims: (state, action) => {
      state.claims = action.payload;
    },
    addClaim: (state, action) => {
      state.claims.push(action.payload);
    },
    updateClaim: (state, action) => {
      const index = state.claims.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.claims[index] = action.payload;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setClaims, addClaim, updateClaim, setSearchTerm } = claimsSlice.actions;
export default claimsSlice.reducer;
