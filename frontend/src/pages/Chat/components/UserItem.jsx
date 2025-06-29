import { FaUserCircle } from "react-icons/fa";
import classNames from "classnames";

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

const UserItem = ({ user, onClick, isActive, isCurrentUser, isOnline }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "d-flex align-items-center p-3 mb-2 rounded-3 border shadow-sm w-100 text-start",
        {
          "user-item--active": isActive,
          "user-item--inactive": !isActive,
        }
      )}
      aria-pressed={isActive}
      title={user.fullName}
      style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
    >
      <div
        style={{ position: "relative" }}
        className="me-3 flex-shrink-0"
      >
        {user.profilePic ? (
          <img
            src={`${baseUrl}${user.profilePic}`}
            alt={`${user.name}'s profilePic`}
            className="rounded-circle"
            style={{ width: 36, height: 36, objectFit: "cover" }}
          />
        ) : (
          <FaUserCircle
            size={36}
            aria-hidden="true"
            className="text-secondary"
          />
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
            backgroundColor: isOnline ? "#4CAF50" : "#A9A9A9",
            border: "2px solid white",
          }}
        />
      </div>

      <div className="flex-grow-1">
        <div
          className="fw-semibold text-truncate"
          style={{ fontSize: "1rem", color: isActive ? "#F6EEF7" : "#6A4573" }}
        >
          {isCurrentUser ? "(You)" : `${user.fullName}`}
        </div>

        {/* {user.lastMessage && (
          <div
            className="text-truncate small mt-1"
            style={{
              color: isActive ? "#F6EEF7" : "#6A4573",
              opacity: 0.85,
              fontSize: "0.875rem",
            }}
          >
            {user.lastMessage}
          </div>
        )} */}
      </div>

      <style jsx>{`
    button.user-item--active {
      background-color: #c8a2c8;
      border-color: #6a4573;
      color: #f6eef7;
    }
    button.user-item--active:hover,
    button.user-item--active:focus {
      background-color: #b38bb3;
      border-color: #5a3963;
      outline: none;
    }
    button.user-item--inactive {
      background-color: #f6eef7;
      border-color: #ffddc1;
      color: #6a4573;
    }
    button.user-item--inactive:hover,
    button.user-item--inactive:focus {
      background-color: #eadff0;
      border-color: #e6c1ad;
      color: #6a4573;
      outline: none;
    }
    button {
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      border-width: 1.5px;
    }
    button:focus-visible {
      outline: 3px solid #6a4573;
      outline-offset: 2px;
    }
  `}</style>
    </button>
  );
};

export default UserItem;
