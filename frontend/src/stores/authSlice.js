import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../Api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userCredentials }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", userCredentials);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);

export const checkForAuthenticateUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  isCheckingUser: false,
  isLogging: false,
  user: null,
  hasError: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // builder::loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogging = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogging = false;

        state.user = action.payload?.user || null;

        if (action.payload?.authToken) {
          localStorage.setItem("authToken", action.payload.authToken);
          state.token = action.payload.authToken;
          state.isAuthenticated = true;
        } else {
          state.token = null;
          state.isAuthenticated = false;
        }

        state.hasError = false;
        state.errorMessage = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLogging = false;
        state.hasError = true;
        state.errorMessage = action.payload || action.error?.message || "Login failed";
      });

    //builder::checkForAuthenticateUser
    builder
      .addCase(checkForAuthenticateUser.pending, (state) => {
        state.isCheckingUser = true;
      })

      .addCase(checkForAuthenticateUser.fulfilled, (state, action) => {
        state.isCheckingUser = false;
        state.user = action.payload;
        state.hasError = false;
      })

      .addCase(checkForAuthenticateUser.rejected, (state, action) => {
        state.isCheckingUser = false;
        state.hasError = true;
        state.errorMessage = action.payload || "Login failed";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
