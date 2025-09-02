import { createSlice } from '@reduxjs/toolkit';

const demoData = [
  {
    id: '1',
    policyNumber: 'POL-001',
    type: 'Life Insurance',
    premium: 1200,
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    customerId: '1',
    agentId: '2',
  },
  {
    id: '2',
    policyNumber: 'POL-002',
    type: 'Health Insurance',
    premium: 800,
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    customerId: '1',
    agentId: '2',
  },
  {
    id: '3',
    policyNumber: 'POL-003',
    type: 'Car Insurance',
    premium: 600,
    status: 'Pending',
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    customerId: '3',
    agentId: '2',
  },
];

const initialState = {
  policies: demoData,
  loading: false,
  error: null,
  searchTerm: '',
};

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {
    setPolicies: (state, action) => {
      state.policies = action.payload;
    },
    addPolicy: (state, action) => {
      state.policies.push(action.payload);
    },
    updatePolicy: (state, action) => {
      const index = state.policies.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.policies[index] = action.payload;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setPolicies, addPolicy, updatePolicy, setSearchTerm } = policiesSlice.actions;
export default policiesSlice.reducer;
