import { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import NoMessagesPlaceholder from "./NoMessagesPlaceholder";

const COLORS = {
  lavender: "#C8A2C8",
  peach: "#FFDDC1",
  darkPurple: "#6A4573",
  softLavender: "#F6EEF7",
};

const MessageContent = ({ messages = [], loading = false, currentUserId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div
        ref={containerRef}
        className="px-3 py-2 overflow-auto"
        style={{
          backgroundColor: COLORS.softLavender,
          flex: "1 1 0",
          minHeight: 0,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="d-flex mb-3"
          >
            <Skeleton
              width={200}
              height={40}
              borderRadius={15}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="px-3 py-2 overflow-auto"
      style={{
        backgroundColor: COLORS.softLavender,
        flex: "1 1 0", // This replaces flexGrow: 1 and is more explicit
        minHeight: 0, // essential to prevent growing beyond container and enable scrolling inside flex
      }}
    >
      {messages.length === 0 && <NoMessagesPlaceholder />}
      {messages.map(({ id, senderId, text, timestamp }) => {
        const isSender = senderId === currentUserId;
        return (
          <div
            key={id}
            className={`d-flex flex-column mb-3 ${
              isSender ? "align-items-end" : "align-items-start"
            }`}
          >
            <div
              className="p-2"
              style={{
                maxWidth: "75%",
                backgroundColor: isSender ? COLORS.lavender : COLORS.peach,
                color: COLORS.darkPurple,
                borderRadius: 15,
                borderTopRightRadius: isSender ? 0 : 15,
                borderTopLeftRadius: isSender ? 15 : 0,
                boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
                wordBreak: "break-word",
                fontSize: "0.95rem",
              }}
            >
              {text}
            </div>
            <small
              className="mt-1 text-muted"
              style={{ fontSize: "0.75rem", opacity: 0.7 }}
            >
              {new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default MessageContent;
