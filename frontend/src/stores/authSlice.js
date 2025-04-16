import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userCredentials }) => {
    try {
      const response = await axios.post("/api/login", userCredentials);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const checkForAuthenticateUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const response = await axios.get("/api/auth/check");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  isCheckingUser: true,
  user: null,
  hasError: true,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isCheckingUser = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isCheckingUser = false;
        state.user = action.payload;
        state.hasError = false;
        state.errorMessage = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isCheckingUser = false;
        state.hasError = true;
        state.errorMessage = action.payload || action.error?.message || "Login failed";
      });

    //checkForAuthenticateUser
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

// export const {  } = authSlice.actions;
export default authSlice.reducer;
