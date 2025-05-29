import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageWindow from "./components/MessageWindow";
import UsersSidebar from "./components/UsersSidebar";
import { fetchAllChatUsersThunk } from "../../stores/chatStore/chatThunks";
import { resetChatInitialStates } from "../../stores/chatStore/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchAllChatUsersThunk());
    return () => {
      dispatch(resetChatInitialStates());
    };
  }, []);

  return (
    <div
      className="d-flex bg-light"
      style={{ height: "100%" }}
    >
      <UsersSidebar />
      <MessageWindow
        selectedUser={selector.selectedUser}
        isOnline={true}
        messages={selector.messages}
        onClose={() => dispatch(resetChatInitialStates())}
        onSendMessage={(msg) => console.log("Send", msg)}
        loadingMessages={selector.isLoadingMessage}
        currentUserId={123} // replace with actual logged-in user ID
      />
    </div>
  );
};

export default ChatPage;
