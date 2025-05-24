import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authStore/authSlice";
import sidebarReducer from "./sidebarStore/sidebarSlice";
import socketReducer from "./socketStore/socketSlice";
import chatReducer from "./chatStore/chatSlice";

export const stores = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    socket: socketReducer,
    chat: chatReducer,
  },
});
