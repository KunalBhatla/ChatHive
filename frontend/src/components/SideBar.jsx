import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaComments, FaMusic, FaCog } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import profilePlaceholder from "../assets/profilePlaceholder.jpg";

const COLORS = {
  background: "#F6EEF7", // Soft Lavender
  hover: "#E6D5ED",
  text: "#6A4573",
  border: "#D6C1E0",
};

const baseUrl = import.meta.env.VITE_PROFILE_BASE_URL;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const { user } = useSelector((state) => state.auth || {});
  const chatSelector = useSelector((state) => state.chat);
  const { totalNotificationCount } = chatSelector;

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/chats", label: "Chats", icon: <FaComments />, badge: totalNotificationCount },
    { to: "/music", label: "Music", icon: <FaMusic /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      style={{
        width: isOpen ? 240 : 70,
        height: "100vh",
        backgroundColor: COLORS.background,
        borderRight: `1px solid ${COLORS.border}`,
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem 0.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      {/* Profile Section */}
      <div
        className="position-relative w-100 px-2 mb-4"
        onClick={() => navigate("/update")}
        data-tooltip-id={!isOpen ? "profile-tooltip" : undefined}
        data-tooltip-content={!isOpen ? "Edit Profile" : undefined}
        style={{
          cursor: "pointer",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          display: "flex",
          flexDirection: isOpen ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s",
          gap: isOpen ? "0.5rem" : "0",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <img
          src={user?.profilePic ? `${baseUrl}${user.profilePic}` : profilePlaceholder}
          alt="User"
          className="rounded-circle"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            border: `2px solid ${COLORS.border}`,
          }}
        />
        {isOpen ? (
          <div className="d-flex justify-content-between align-items-center w-100 mt-2 px-2">
            <span
              className="fw-semibold"
              style={{
                color: COLORS.text,
                fontSize: "1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={user?.fullName || "Guest"}
            >
              {user?.fullName || "Guest"}
            </span>
            <FaCog
              style={{
                color: COLORS.text,
                fontSize: "1rem",
                opacity: 0.6,
              }}
            />
          </div>
        ) : null}
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow-1 w-100">
        {navItems.map(({ to, label, icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `d-flex align-items-center gap-2 text-decoration-none mb-2 px-3 py-2 rounded fw-medium ${
                isActive ? "bg-white shadow-sm" : ""
              }`
            }
            style={{
              color: COLORS.text,
              justifyContent: isOpen ? "flex-start" : "center",
              position: "relative",
              padding: isOpen ? "0.5rem 1rem" : "0.5rem",
              borderRadius: "0.5rem",
              width: "100%",
              textAlign: "center",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
            data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
            data-tooltip-content={!isOpen ? label : undefined}
          >
            <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{icon}</span>
            {isOpen && <span>{label}</span>}
            {badge !== undefined && badge > 0 && (
              <span
                className="badge rounded-pill bg-danger"
                style={{
                  fontSize: "0.7rem",
                  position: "absolute",
                  right: isOpen ? 12 : 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: 18,
                  height: 18,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 6px",
                }}
              >
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Tooltip Definitions */}
      <Tooltip
        id="sidebar-tooltip"
        place="right"
      />
      <Tooltip
        id="profile-tooltip"
        place="right"
      />
    </div>
  );
};

export default Sidebar;
