import { FaUserCircle } from "react-icons/fa";
import classNames from "classnames";

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

const UserItem = ({ user, onClick, isActive }) => {
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
      {user.profilePic ? (
        <img
          src={`${baseUrl}${user.profilePic}`}
          alt={`${user.name}'s profilePic`}
          className="rounded-circle me-3 flex-shrink-0"
          style={{ width: 36, height: 36, objectFit: "cover" }}
        />
      ) : (
        <FaUserCircle
          className="me-3 flex-shrink-0"
          size={36}
          aria-hidden="true"
        />
      )}
      <div className="flex-grow-1">
        <div
          className="fw-semibold text-truncate"
          style={{ fontSize: "1rem", color: isActive ? "#F6EEF7" : "#6A4573" }}
        >
          {user.fullName}
        </div>
        {/* <div
          className="small"
          style={{
            color: isActive ? "#FFDDE0" : "#6A4573",
            opacity: 0.85,
          }}
        >
          {user.status || "Available"}
        </div> */}
      </div>

      <style jsx>{`
  button.user-item--active {
    background-color: #c8a2c8; /* Lavender */
    border-color: #6a4573; /* Dark Purple */
    color: #f6eef7; /* Soft Lavender text */
  }
  button.user-item--active:hover,
  button.user-item--active:focus {
    background-color: #b38bb3; /* Slightly darker lavender */
    border-color: #5a3963;
    outline: none;
  }
  button.user-item--inactive {
    background-color: #f6eef7; /* Soft Lavender */
    border-color: #ffddc1; /* Peach */
    color: #6a4573; /* Dark Purple */
  }
  button.user-item--inactive:hover,
  button.user-item--inactive:focus {
    background-color: #eadff0; /* Lighter Lavender for hover */
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
