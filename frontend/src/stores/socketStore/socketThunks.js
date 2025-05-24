import { socket } from "../../lib/socket";
import { disconnectSocket, setIsConnected } from "./socketSlice";

export const initializeSocket = () => (dispatch, getState) => {
  if (!socket.connected) {
    const token = localStorage.getItem("authToken");
    if (token) {
      socket.auth = { authToken: token };
      socket.connect();
    }
    socket.on("connect", () => {
      dispatch(setIsConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setIsConnected(false));
    });

    // socket.on("user_disconnected", (userId) => {
    //   dispatch(removeOnlineUser(userId));
    // });
  }
};

export const disconnectSocketThunk = () => (dispatch, getState) => {
  if (socket && socket.connected) {
    socket.disconnect();
    dispatch(setIsConnected(false));
    dispatch(disconnectSocket());
  }
};
