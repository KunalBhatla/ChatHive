import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const baseURL = "http://localhost:4000";
// const baseURL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

const initialState = {
  users: [],
  isLoading: false,
  socket: socket,
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
    initializeSocket: (state) => {
      if (!state.socket.connected) {
        state.socket.connect();

        state.socket.on("connect", () => {
          state.isConnected = true;
        });

        state.socket.on("disconnect", () => {
          state.isConnected = false;
        });

        state.socket.on("user_disconnected", (userId) => {
          state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
        });
      }
    },
    disconnectSocket: (state) => {
      if (state.isConnected) {
        state.isConnected = false;
      }
    },
  },
});

export const { initializeSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
