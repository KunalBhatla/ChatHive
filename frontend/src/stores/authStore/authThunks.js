import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Api";
import { initializeSocket } from "../socketStore/socketSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userCredentials }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", userCredentials);
      if (response?.status === 200) {
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

export const checkForAuthenticateUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Something went wrong...!"
    );
  }
});
