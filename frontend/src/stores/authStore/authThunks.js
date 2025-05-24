import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Api";
import { initializeSocket } from "../socketStore/socketThunks";
import { updateCurrentUserDetailsService } from "../../Api/UserServices";
import { showErrorToast, showSuccessToast } from "../../components/common/toastUtils";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userCredentials }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", userCredentials);
      if (response?.status === 200) {
        const { authToken } = response.data;
        localStorage.setItem("authToken", authToken);
        thunkAPI.dispatch(initializeSocket());
      }
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);

export const checkForAuthenticateUser = createAsyncThunk(
  "auth/checkUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/check");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);

export const updateCurrentUserDetails = createAsyncThunk(
  "auth/updateUser",
  async (data, thunkAPI) => {
    try {
      const {
        data: userDetails,
        message,
        success,
      } = await updateCurrentUserDetailsService(data);
      if (success) {
        showSuccessToast(message);
      } else {
        showErrorToast(message || "Something went wrong...!");
      }
      return userDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);
