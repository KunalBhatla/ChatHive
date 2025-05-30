import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageWindow from "./components/MessageWindow";
import UsersSidebar from "./components/UsersSidebar";
import {
  fetchAllChatUsersThunk,
  fetchParticipantsMessagesThunk,
} from "../../stores/chatStore/chatThunks";
import { resetChatInitialStates } from "../../stores/chatStore/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const chatSelector = useSelector((state) => state.chat);
  const { selectedUser } = chatSelector;

  console.log(selectedUser);
  useEffect(() => {
    dispatch(fetchAllChatUsersThunk());
    return () => {
      dispatch(resetChatInitialStates());
    };
  }, []);

  useEffect(() => {
    if (selectedUser) dispatch(fetchParticipantsMessagesThunk());
  }, [selectedUser]);

  return (
    <div
      className="d-flex bg-light"
      style={{ height: "100%" }}
    >
      <UsersSidebar />
      <MessageWindow />
    </div>
  );
};

export default ChatPage;
