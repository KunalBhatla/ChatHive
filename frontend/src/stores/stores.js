import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authStore/authSlice";
import sidebarReducer from "./sidebarStore/sidebarSlice";
import socketReducer from "./socketStore/socketSlice";

export const stores = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    socket: socketReducer,
  },
});
