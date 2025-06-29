import { FaUserCircle, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const COLORS = {
  lavender: "#C8A2C8",
  softLavender: "#F6EEF7",
  greenOnline: "#4CAF50",
  grayOffline: "#A9A9A9",
};

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

const MessageHeader = ({ onClose }) => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const currentLoggedInUser = useSelector((state) => state.auth?.user);

  return (
    <div
      className="d-flex align-items-center justify-content-between border-bottom px-3 py-2"
      style={{ backgroundColor: COLORS.lavender, color: COLORS.softLavender }}
    >
      <div className="d-flex align-items-center gap-2">
        <div
          style={{ position: "relative" }}
          className="me-1 flex-shrink-0"
        >
          {selectedUser.profilePic ? (
            <img
              src={`${baseUrl}${selectedUser.profilePic}`}
              alt={`${selectedUser.fullName} avatar`}
              className="rounded-circle"
              style={{ width: 40, height: 40, objectFit: "cover" }}
            />
          ) : (
            <FaUserCircle size={40} />
          )}

          {/* Online/offline dot */}
          <span
            className="status-dot"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: onlineUsers?.includes(selectedUser?.id)
                ? "#4CAF50"
                : "#A9A9A9",
              border: "2px solid white",
            }}
          />
        </div>
        <div className="d-flex flex-column">
          <span
            className="fw-semibold"
            style={{ fontSize: "1.1rem", color: COLORS.softLavender }}
          >
            {currentLoggedInUser?.id === selectedUser?.id
              ? "(You)"
              : selectedUser?.fullName || "Unknown User"}
          </span>

          <div
            className="d-flex align-items-center gap-1"
            style={{ fontSize: "0.8rem", opacity: 0.9, color: COLORS.softLavender }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                // backgroundColor: isOnline ? COLORS.greenOnline : COLORS.grayOffline,
              }}
              // aria-label={isOnline ? "Online" : "Offline"}
              // title={isOnline ? "Online" : "Offline"}
            />
            {/* <small>{isOnline ? "Online" : "Offline"}</small> */}
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close message window"
        className="btn btn-sm btn-outline-light"
        style={{ borderColor: COLORS.softLavender }}
      >
        <FaTimes size={18} />
      </button>
    </div>
  );
};

export default MessageHeader;
