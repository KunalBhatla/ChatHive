import { createSlice } from "@reduxjs/toolkit";

const baseURL = "http://localhost:4000";
// const baseURL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

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
    disconnectSocket: (state) => {
      if (state.isConnected) {
        state.isConnected = false;
      }
    },
  },
});

export const { setIsConnected, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
