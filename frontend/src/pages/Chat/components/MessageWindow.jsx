import { useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageFooter from "./MessageFooter";
import NoSelectedUser from "./NoSelectedUser";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectUser } from "../../../stores/chatStore/chatSlice";

const MessageWindow = ({
  selectedUser,
  isOnline,
  messages,
  onSendMessage,
  loadingMessages,
  currentUserId,
}) => {
  const [sendingDisabled, setSendingDisabled] = useState(false);
  const select = useSelector((state) => state.chat);
  console.log("select ->", select);
  const dispatch = useDispatch();

  const handleSend = async (msg) => {
    setSendingDisabled(true);
    try {
      await onSendMessage(msg);
    } finally {
      setSendingDisabled(false);
    }
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
        loading={loadingMessages}
        currentUserId={currentUserId}
      />

      <MessageFooter
        onSendMessage={handleSend}
        disabled={sendingDisabled}
      />
    </div>
  );
};

export default MessageWindow;
