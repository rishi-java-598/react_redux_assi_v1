import { createSlice } from '@reduxjs/toolkit';

const demoUsers = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password',
    role: 'customer',
    name: 'John Doe',
    phone: '123-456-7890',
  },
  {
    id: '2',
    email: 'agent@example.com',
    password: 'password',
    role: 'agent',
    name: 'Jane Smith',
    phone: '098-765-4321',
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password',
    role: 'administrator',
    name: 'Admin User',
    phone: '555-123-4567',
  },
  {
    id: '4',
    email: 'customer2@example.com',
    password: 'password',
    role: 'customer',
    name: 'Alice Johnson',
    phone: '444-555-6666',
  },
];

const initialState = {
  users: demoUsers,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
