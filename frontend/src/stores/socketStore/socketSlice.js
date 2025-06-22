import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  messages: [],
  selectedUser: null,
  onlineUsers: [],
  userActivities: {},
  isConnected: false,
  error: null,
};

const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.isConnected) {
        state.isConnected = false;
      }
    },
  },
});

export const { setIsConnected, disconnectSocket, updateOnlineUsers } =
  socketSlice.actions;
export default socketSlice.reducer;
