import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cyclesInitialState = {
  cycles: localStorage.getItem('cyclesInfo')
    ? JSON.parse(localStorage.getItem('cyclesInfo'))
    : [],
  activeCycle: localStorage.getItem('activeCycle')
    ? JSON.parse(localStorage.getItem('activeCycle'))
    : null,
  isLoading: false,
  error: null,
};

export const fetchCycles = createAsyncThunk(
  'cycle/fetchCycles',
  async (systemId) => {
    const response = await axios.get(`/tracking/cycles/${systemId}`);
    return response.data;
  }
);

export const fetchTotalHarvests = createAsyncThunk(
  'cycle/fetchTotalHarvests',
  async (cycleId) => {
    const response = await axios.get(`/tracking/harvests/all-harvests/${cycleId}`);
    return { cycleId, harvests: response.data.harvests };
  }
);

export const deleteCycle = createAsyncThunk(
  'cycle/deleteCycle',
  async (cycleId) => {
    await axios.delete(`/tracking/cycles/${cycleId}`);
    return cycleId;
  }
);

const cycleSlice = createSlice({
  name: 'cycle',
  initialState: cyclesInitialState,
  reducers: {
    createCycleSuccess(state, action) {
      state.activeCycle = action.payload;
      state.error = null;
      localStorage.setItem('activeCycle', JSON.stringify(action.payload));
    },
    createCycleFailure(state, action) {
      state.activeCycle = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCycles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCycles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCycles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cycles = action.payload;
      })
      .addCase(fetchTotalHarvests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalHarvests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTotalHarvests.fulfilled, (state, action) => {
        state.isLoading = false;
        const { cycleId, harvests } = action.payload;
        const cycleIndex = state.cycles.findIndex((cycle) => cycle._id === cycleId);
        if (cycleIndex !== -1) {
          state.cycles[cycleIndex].totalHarvests = harvests;
        }
      });
  },
});

export const { createCycleSuccess, createCycleFailure } = cycleSlice.actions;
export default cycleSlice.reducer;
