import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/seed');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// // Async thunk for user registration
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (userData) => {
//     try {
//       const response = await axios.post('/tracking/users/register', userData);
//       console.log(response.data);
//             localStorage.setItem('userInfo', JSON.stringify(response.data));

//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// Async thunk for user registration
export const signinUser = createAsyncThunk('user/signin', async (userData) => {
  console.log('hello from signin');
  try {
    const response = await axios.post('/tracking/users/login', userData);
    const userInfo = response.data.userInfo;
    return userInfo;
  } catch (error) {
    throw error;
  }
});

const userInitialState = {
  isLoggedIn: false,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userRegister(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLoggedOut(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isLoggedIn = true;

        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      });
  },
});

export const { userLoggedOut, userRegister } = authSlice.actions;

export default authSlice.reducer;
