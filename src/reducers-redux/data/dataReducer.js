import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/data/seed'); // Adjust the URL
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchPlants = createAsyncThunk('fetchPlants', async () => {
  try {
    const response = await axios.get(
      'http://localhost:5050/api/v1/data/plants'
    ); // Adjust the URL
    console.log(response.data);
    return response.data; // You need to return the data from the response, not just the response object itself.
  } catch (error) {
    throw error;
  }
});

const data = {
  plants: [],
  diseases: [],
  systems: [],
};

const dataInitialState = {
  data: data,
  isLoading: false,
  error: null,
};

// Create a slice
export const dataSlice = createSlice({
  name: 'data',
  initialState: dataInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.plants = action.payload.plants;
        state.data.diseases = action.payload.diseases;
        state.data.systems = action.payload.systems;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
