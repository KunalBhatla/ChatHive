import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaHome, FaComments, FaMusic, FaCog, FaBars } from "react-icons/fa";
import { toggleDrawer } from "../stores/sidebarStore/sidebarSlice";
import profilePlaceholder from "../assets/profilePlaceholder.jpg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const { user } = useSelector((state) => state.auth || {});
  const unreadMessagesCount = 3;

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/chats", label: "Chats", icon: <FaComments />, badge: unreadMessagesCount },
    { to: "/music", label: "Music", icon: <FaMusic /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      style={{
        width: isOpen ? "250px" : "70px",
        height: "100vh",
        backgroundColor: "#F6EEF7",
        borderRight: "2px solid #6A4573",
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: isOpen ? "flex-start" : "center",
        padding: "1rem 0.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Toggle Button */}
      {/* <button
        onClick={() => dispatch(toggleDrawer())}
        style={{
          alignSelf: isOpen ? "flex-end" : "center",
          marginBottom: "1rem",
          background: "transparent",
          border: "none",
          fontSize: "1.25rem",
          color: "#6A4573",
          cursor: "pointer",
        }}
        title={isOpen ? "Collapse" : "Expand"}
      >
        <FaBars />
      </button> */}

      {/* User Info */}
      <div
        className="d-flex align-items-center mb-4"
        style={{ flexDirection: isOpen ? "row" : "column", gap: "0.5rem" }}
      >
        <img
          src={user?.profilePic || profilePlaceholder}
          alt="User"
          className="rounded-circle"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            border: "2px solid #6A4573",
          }}
        />
        {isOpen && (
          <div
            className="fw-bold"
            style={{ color: "#6A4573" }}
          >
            {user?.name || "Guest"}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 w-100">
        {navItems.map(({ to, label, icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `d-flex align-items-center gap-2 text-decoration-none mb-3 px-3 py-2 rounded 
              ${isActive ? "bg-dark-purple text-white" : "text-dark-purple"}`
            }
            style={{
              color: "#6A4573",
              justifyContent: isOpen ? "flex-start" : "center",
              position: "relative",
            }}
            title={isOpen ? "" : label}
          >
            <span style={{ fontSize: "1.25rem" }}>{icon}</span>
            {isOpen && <span>{label}</span>}
            {badge > 0 && (
              <span
                className="badge rounded-pill bg-danger"
                style={{
                  fontSize: "0.75rem",
                  position: "absolute",
                  right: isOpen ? "10px" : "-8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
