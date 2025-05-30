import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const COLORS = {
  lavender: "#C8A2C8",
  peach: "#FFDDC1",
  darkPurple: "#6A4573",
  softLavender: "#F6EEF7",
};

const MessageFooter = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="d-flex align-items-center p-3 border-top"
      style={{
        backgroundColor: COLORS.lavender,
        flexShrink: 0, // Prevent footer from shrinking
      }}
    >
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          backgroundColor: COLORS.softLavender,
          borderColor: COLORS.darkPurple,
          color: COLORS.darkPurple,
          fontSize: "1rem",
        }}
        disabled={disabled}
      />
      <button
        type="submit"
        className="btn"
        disabled={message.trim() === "" || disabled}
        style={{
          backgroundColor:
            message.trim() === "" || disabled ? COLORS.peach : COLORS.darkPurple,
          color:
            message.trim() === "" || disabled ? COLORS.darkPurple : COLORS.softLavender,
          transition: "background-color 0.3s ease",
        }}
        aria-label="Send message"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageFooter;
