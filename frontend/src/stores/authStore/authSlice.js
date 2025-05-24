import { createSlice } from "@reduxjs/toolkit";
import {
  checkForAuthenticateUser,
  loginUser,
  updateCurrentUserDetails,
} from "./authThunks.js";
import { showErrorToast, showSuccessToast } from "../../components/common/toastUtils.js";

const initialState = {
  isCheckingUser: false,
  isLogging: false,
  isUpdating: false,
  user: null,
  hasError: false,
  errorMessage: null,
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("authToken");
      state.user = null;
      state.token = null;
      state.hasError = false;
      state.errorMessage = null;
      showSuccessToast("You have been logged out successfully.");
    },
  },
  extraReducers: (builder) => {
    //! builder::loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLogging = true;
        state.hasError = false;
        state.errorMessage = null;
        state.token = null;
        state.user = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogging = false;
        state.user = action.payload?.user;
        state.token = action.payload?.authToken;
        localStorage.setItem("authToken", action.payload?.authToken);
        state.hasError = false;
        state.errorMessage = null;
        showSuccessToast(action.payload?.message);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLogging = false;
        state.hasError = true;
        state.errorMessage = action.payload || action.error?.message || "Login failed";
        showErrorToast(action.payload);
        state.user = null;
        state.token = null;
      });

    //! builder::checkForAuthenticateUser
    builder
      .addCase(checkForAuthenticateUser.pending, (state) => {
        state.isCheckingUser = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(checkForAuthenticateUser.fulfilled, (state, action) => {
        state.isCheckingUser = false;
        state.user = action.payload.user;
        state.hasError = false;
      })
      .addCase(checkForAuthenticateUser.rejected, (state, action) => {
        state.isCheckingUser = false;
        state.hasError = true;
        state.errorMessage = action.payload || "Login failed";
        state.token = null;
        state.user = null;
      });

    //! builder::updateCurrentUserDetails
    builder
      .addCase(updateCurrentUserDetails.pending, (state) => {
        state.isUpdating = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(updateCurrentUserDetails.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
        state.hasError = false;
      })
      .addCase(updateCurrentUserDetails.rejected, (state, action) => {
        state.isUpdating = false;
        state.hasError = true;
        state.errorMessage = action.payload || "Login failed";
        state.token = null;
        state.user = null;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
