import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageFooter from "./MessageFooter";
import NoSelectedUser from "./NoSelectedUser";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectUser } from "../../../stores/chatStore/chatSlice";
import { sendMessageThunk } from "../../../stores/chatStore/chatThunks";

const MessageWindow = () => {
  const chat = useSelector((state) => state.chat);
  const auth = useSelector((state) => state.auth);

  const { isLoadingMessages, isSendingMessage, messages, selectedUser } = chat;
  const { user } = auth;

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
    <div className="d-flex flex-column flex-grow-1 bg-white">
      <MessageHeader onClose={() => dispatch(handleSelectUser(null))} />

      <MessageContent
        messages={messages}
        loading={isLoadingMessages}
        currentUserId={user?.id}
      />

      <MessageFooter
        onSendMessage={handleSend}
        disabled={isSendingMessage}
      />
    </div>
  );
};

export default MessageWindow;
