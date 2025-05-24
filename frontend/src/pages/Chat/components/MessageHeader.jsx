import { FaUserCircle, FaTimes } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const COLORS = {
  lavender: "#C8A2C8",
  softLavender: "#F6EEF7",
  greenOnline: "#4CAF50",
  grayOffline: "#A9A9A9",
};

const MessageHeader = ({ user, isOnline, onClose, loading = false }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between border-bottom px-3 py-2"
      style={{ backgroundColor: COLORS.lavender, color: COLORS.softLavender }}
    >
      <div className="d-flex align-items-center gap-2">
        {loading ? (
          <Skeleton
            circle
            width={40}
            height={40}
          />
        ) : user?.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.name} avatar`}
            className="rounded-circle"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : (
          <FaUserCircle size={40} />
        )}
        <div className="d-flex flex-column">
          {loading ? (
            <Skeleton
              width={120}
              height={18}
            />
          ) : (
            <span
              className="fw-semibold"
              style={{ fontSize: "1.1rem", color: COLORS.softLavender }}
            >
              {user?.name || "Unknown User"}
            </span>
          )}
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
                backgroundColor: isOnline ? COLORS.greenOnline : COLORS.grayOffline,
              }}
              aria-label={isOnline ? "Online" : "Offline"}
              title={isOnline ? "Online" : "Offline"}
            />
            <small>{isOnline ? "Online" : "Offline"}</small>
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
