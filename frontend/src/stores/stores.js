import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authStore/authSlice";

export const stores = configureStore({
  reducer: {
    auth: authReducer,
  },
});
