import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChatUsersThunk } from "./chatThunks";

const initialState = {
  selectedUser: null,
  isLoadingMessage: false,
  isLoadingUsers: false,
  isErrorFetchingUsers: null,
  users: [],
  messages: [],
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    handleSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    resetChatInitialStates: (state) => {
      state.selectedUser = null;
      state.isLoadingMessage = false;
      state.isLoadingUsers = false;
      state.isErrorFetchingUsers = null;
      state.users = [];
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    // builder::fetchAllChatUsersThunk
    builder
      .addCase(fetchAllChatUsersThunk.pending, (state) => {
        state.isLoadingUsers = true;
      })

      .addCase(fetchAllChatUsersThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.isLoadingUsers = false;
        state.users = data;
      })

      .addCase(fetchAllChatUsersThunk.rejected, (state, action) => {
        state.isLoadingUsers = false;
        state.isErrorFetchingUsers = action.payload;
      });
  },
});

export const { handleSelectUser, resetChatInitialStates } = chatSlice.actions;
export default chatSlice.reducer;
