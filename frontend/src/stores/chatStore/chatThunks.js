import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Api";

export const fetchAllChatUsersThunk = createAsyncThunk(
  "chat/users",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/chat");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);
