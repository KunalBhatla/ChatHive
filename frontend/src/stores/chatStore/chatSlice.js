import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllChatUsersThunk,
  fetchParticipantsMessagesThunk,
  sendMessageThunk,
} from "./chatThunks";

const initialState = {
  selectedUser: null,
  isLoadingMessages: false,
  isLoadingUsers: false,
  isSendingMessage: false,
  isErrorFetchingUsers: null,
  isErrorSendingMessage: null,
  isErrorFetchingMessages: null,
  users: [],
  messages: [],
  totalNotificationCount: 0,
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
      state.isLoadingMessages = false;
      state.isSendingMessage = false;
      state.isLoadingUsers = false;
      state.isErrorFetchingUsers = null;
      state.users = [];
      state.messages = [];
    },
    syncNotificationCount: (state, action) => {
      const { setNotificationValue = null, type = null, by = 1 } = action.payload || {};

      const count = Number(by) || 1;

      if (type == "increment" || type?.toLowerCase().startsWith("incr")) {
        state.totalNotificationCount += count;
      } else if (type == "decrement" || type?.toLowerCase().startsWith("decr")) {
        state.totalNotificationCount = Math.max(0, state.totalNotificationCount - count);
      } else if (typeof setNotificationValue === "number") {
        state.totalNotificationCount = setNotificationValue;
      }
    },

    pushNewMessageInList: (state, action) => {
      state.messages.push(action.payload);
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

    // builder::sendMessageThunk
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isSendingMessage = true;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isSendingMessage = false;
      })

      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.isErrorSendingMessage =
          action.payload || "Something went wrong while sending message...!";
      });

    // builder::fetchParticipantsMessagesThunk
    builder
      .addCase(fetchParticipantsMessagesThunk.pending, (state) => {
        state.isLoadingMessages = true;
        state.messages = [];
      })

      .addCase(fetchParticipantsMessagesThunk.fulfilled, (state, action) => {
        state.isLoadingMessages = false;
        state.messages = action.payload.data || [];
      })

      .addCase(fetchParticipantsMessagesThunk.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.isErrorFetchingMessages =
          action.payload || "Something went wrong while sending message...!";
      });
  },
});

export const {
  handleSelectUser,
  resetChatInitialStates,
  pushNewMessageInList,
  syncNotificationCount,
} = chatSlice.actions;
export default chatSlice.reducer;
