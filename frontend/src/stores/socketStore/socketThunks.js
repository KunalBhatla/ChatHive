import { socket } from "../../lib/socket";
import { disconnectSocket, setIsConnected, updateOnlineUsers } from "./socketSlice";

export const initializeSocket = () => (dispatch, getState) => {
  if (!socket.connected) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) return;

    socket.auth = { authToken };
    socket.connect();

    socket.on("connect", () => {
      dispatch(setIsConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setIsConnected(false));
    });

    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log("onlineUsers ->", onlineUsers);
      dispatch(updateOnlineUsers(onlineUsers));
    });
  }
};

export const disconnectSocketThunk = () => (dispatch, getState) => {
  if (socket && socket.connected) {
    socket.disconnect();
    dispatch(setIsConnected(false));
    dispatch(disconnectSocket());
  }
};
