import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Api";
import {
  fetchParticipantsMessagesService,
  sendMessageService,
} from "../../Api/ChatServices";
import { showSuccessToast } from "../../components/common/toastUtils";

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

export const fetchParticipantsMessagesThunk = createAsyncThunk(
  "chat/messages",
  async (_, thunkAPI) => {
    try {
      const {
        chat: { selectedUser },
      } = thunkAPI.getState();
      const id = selectedUser?.id;
      if (!selectedUser) {
        return thunkAPI.rejectWithValue("No user selected");
      }

      const response = await fetchParticipantsMessagesService({ id });

      return response;
    } catch (error) {
      console.log("Error in fetchParticipantsMessagesThunk", error.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong...!"
      );
    }
  }
);

export const sendMessageThunk = createAsyncThunk("chat/send", async (data, thunkAPI) => {
  try {
    const {
      chat: { selectedUser, messages },
    } = thunkAPI.getState();
    const id = selectedUser?.id;
    if (!selectedUser) {
      return thunkAPI.rejectWithValue("No user selected");
    }
    const payload = {
      content: data,
      receiverId: id,
    };

    const response = await sendMessageService(payload);
    showSuccessToast(response?.message || "Message send successfully");

    // messages.push({});
    // thunkAPI.dispatch(fetchParticipantsMessagesThunk());
    return response;
  } catch (error) {
    console.log("Error in sendMessageThunk", error.message);
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Something went wrong...!"
    );
  }
});
