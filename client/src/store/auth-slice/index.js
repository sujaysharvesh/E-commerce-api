import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const formData = {
  Name: 'trex',
  Email: 'trex@gmail.com',
  Password: 'qweasdzxc',
  ConfirmPassword: 'qweasdzxc',
};

// Async thunk to register a user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response || error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming response includes user and token
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload; // Storing error message
      });
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
