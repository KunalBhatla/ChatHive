import { FaUserCircle } from "react-icons/fa";
import classNames from "classnames";
import moment from "moment";

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

// Time formatting function
// const formatLastMessageTime = (timestamp) => {
//   if (!timestamp) return "";

//   const now = moment();
//   const messageTime = moment(timestamp);
//   const diffMinutes = now.diff(messageTime, "minutes");
//   const diffHours = now.diff(messageTime, "hours");
//   const diffDays = now.diff(messageTime, "days");

//   if (diffMinutes < 1) return "now";
//   if (diffMinutes < 60) return `${diffMinutes}m`;
//   if (diffHours < 24) return `${diffHours}h`;
//   if (diffDays < 7) return `${diffDays}d`;
//   if (diffDays < 365) return messageTime.format("MMM DD");
//   return messageTime.format("MM/DD/YY");
// };
// Professional time formatting function
const formatLastMessageTime = (timestamp) => {
  if (!timestamp) return "";

  const now = moment();
  const messageTime = moment(timestamp);
  const diffInMinutes = now.diff(messageTime, "minutes");
  const diffInHours = now.diff(messageTime, "hours");
  const diffInDays = now.diff(messageTime, "days");

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (messageTime.year() === now.year()) {
    return messageTime.format("MMM DD");
  } else {
    return messageTime.format("MMM DD, YYYY");
  }
};

const UserItem = ({ user, onClick, isActive, isCurrentUser, isOnline }) => {
  const hasUnread = user.unreadNotificationCount > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "d-flex align-items-center p-3 mb-2 rounded-3 border shadow-sm w-100 text-start user-item",
        {
          "user-item--active": isActive,
          "user-item--inactive": !isActive,
        }
      )}
      aria-pressed={isActive}
      title={user.fullName}
    >
      {/* Profile Picture with Online Status */}
      <div className="position-relative me-3 flex-shrink-0">
        {user.profilePic ? (
          <img
            src={`${baseUrl}${user.profilePic}`}
            alt={`${user.name}'s profile`}
            className="rounded-circle"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : (
          <FaUserCircle
            size={40}
            aria-hidden="true"
            className="text-secondary"
          />
        )}

        {/* Online Status Indicator */}
        <span
          className="position-absolute top-0 end-0 status-dot"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: isOnline ? "#4CAF50" : "#A9A9A9",
            border: "2px solid white",
            transform: "translate(25%, -25%)",
          }}
        />
      </div>

      {/* User Info Container */}
      <div className="flex-grow-1 overflow-hidden me-2">
        {/* Name and Unread Badge Row */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div
            className="fw-semibold text-truncate"
            style={{
              fontSize: "0.95rem",
              color: isActive ? "#F6EEF7" : "#6A4573",
              maxWidth: hasUnread ? "calc(100% - 60px)" : "100%",
            }}
          >
            {isCurrentUser ? "(You)" : user.fullName}
          </div>

          {/* Unread Badge */}
          {hasUnread && (
            <span
              className="badge bg-danger text-white rounded-pill flex-shrink-0 ms-2"
              style={{
                fontSize: "0.65rem",
                minWidth: "18px",
                height: "18px",
                padding: "2px 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1",
              }}
            >
              {user.unreadNotificationCount > 99 ? "99+" : user.unreadNotificationCount}
            </span>
          )}
        </div>

        {/* Last Message and Time Row */}
        {(user.lastMessage || user.lastMessageTime) && (
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="text-truncate flex-grow-1"
              style={{
                color: isActive ? "#F6EEF7" : "#6A4573",
                fontSize: "0.8rem",
                opacity: 0.85,
                marginRight: "8px",
              }}
            >
              {user.lastMessage || "No messages yet"}
            </div>

            {user.lastMessageTime && (
              <small
                className="text-nowrap flex-shrink-0"
                style={{
                  fontSize: "0.7rem",
                  color: isActive ? "#F6EEF7" : "#6A4573",
                  opacity: 0.7,
                }}
              >
                {formatLastMessageTime(user.lastMessageTime)}
              </small>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .user-item--active {
          background-color: #c8a2c8;
          border-color: #6a4573;
          color: #f6eef7;
        }
        .user-item--active:hover,
        .user-item--active:focus {
          background-color: #b38bb3;
          border-color: #5a3963;
        }
        .user-item--inactive {
          background-color: #f6eef7;
          border-color: #ffddc1;
          color: #6a4573;
        }
        .user-item--inactive:hover,
        .user-item--inactive:focus {
          background-color: #eadff0;
          border-color: #e6c1ad;
        }
        .user-item {
          transition: all 0.2s ease;
          border-width: 1.5px;
          cursor: pointer;
        }
        .user-item:focus-visible {
          outline: 2px solid #6a4573;
          outline-offset: 2px;
        }
        .status-dot {
          box-shadow: 0 0 0 2px white;
        }
      `}</style>
    </button>
  );
};

export default UserItem;
