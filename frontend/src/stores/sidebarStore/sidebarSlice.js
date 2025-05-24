import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleDrawer } = sidebarSlice.actions;
export default sidebarSlice.reducer;
