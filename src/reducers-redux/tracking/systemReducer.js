import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const systemInitialState = {
  system: localStorage.getItem('systemInfo')
    ? JSON.parse(localStorage.getItem('systemInfo'))
    : null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching the system data
export const fetchSystem = createAsyncThunk(
  'system/fetchSystem',
  async (userId) => {
    try {
      const response = await axios.get(`/tracking/systems/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for deleting the system
export const deleteSystem = createAsyncThunk(
  'system/deleteSystem',
  async (systemId) => {
    await axios.delete(`/tracking/systems/${systemId}`);
    return systemId;
  }
);

const systemSlice = createSlice({
  name: 'system',
  initialState: systemInitialState,
  reducers: {
    createSystem(state, action) {
      state.isLoading = false;
      state.system = action.payload;
      localStorage.setItem('systemInfo', JSON.stringify(action.payload));
    },
    setSystem(state, action) {
      state.isLoading = false;
      state.system = action.payload;
      localStorage.setItem('systemInfo', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSystem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSystem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.system = action.payload;
      })
      .addCase(deleteSystem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.system = null;
        localStorage.removeItem('systemInfo');
      });
  },
});

export const { createSystem, setSystem } = systemSlice.actions;

export default systemSlice.reducer;
