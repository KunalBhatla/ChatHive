import { useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageFooter from "./MessageFooter";
import NoSelectedUser from "./NoSelectedUser";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectUser } from "../../../stores/chatStore/chatSlice";
import { sendMessageThunk } from "../../../stores/chatStore/chatThunks";

const MessageWindow = () => {
  const [sendingDisabled, setSendingDisabled] = useState(false);
  const { isLoadingMessages, isSendingMessage, messages, selectedUser } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  const handleSend = async (msg) => {
    await dispatch(sendMessageThunk(msg));
  };

  if (!selectedUser) {
    return (
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <NoSelectedUser />
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column flex-grow-1 bg-white"
      style={
        {
          // height: "100%",
          // minHeight: 0,
          // maxHeight: "100%", // Prevent overflow
        }
      }
    >
      <MessageHeader onClose={() => dispatch(handleSelectUser(null))} />

      <MessageContent
        messages={messages}
        loading={isLoadingMessages}
        currentUserId={2}
      />

      <MessageFooter
        onSendMessage={handleSend}
        disabled={isSendingMessage}
      />
    </div>
  );
};

export default MessageWindow;
