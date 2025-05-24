import { disconnectSocket } from "./socketSlice";

export const disconnectSocketThunk = () => (dispatch, getState) => {
  const socket = getState().socket.socket;

  if (socket && socket.connected) {
    socket.disconnect();
    dispatch(disconnectSocket());
  }
};
