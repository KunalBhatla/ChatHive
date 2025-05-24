import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../stores/sidebarStore/sidebarSlice";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { logoutUser } from "../stores/authStore/authSlice";
import { disconnectSocketThunk } from "../stores/socketStore/socketThunks";

// Header.js
const Header = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(disconnectSocketThunk());
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "60px",
        backgroundColor: "#C8A2C8",
        color: "#6A4573",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        userSelect: "none",
      }}
    >
      <div className="flex-grow-1">
        {/* {isOpen ? <span>Sidebar Open</span> : <span>Sidebar Closed</span>} */}
        <button
          onClick={() => dispatch(toggleDrawer())}
          style={{
            alignSelf: isOpen ? "flex-end" : "center",
            background: "transparent",
            border: "none",
            fontSize: "1.25rem",
            color: "#6A4573",
            cursor: "pointer",
          }}
          title={isOpen ? "Collapse" : "Expand"}
        >
          <FaBars />
        </button>
      </div>
      <div className="flex-grow-1">
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/login")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/login");
            }
          }}
          style={{ fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" }}
        >
          ChatHive
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="btn modern-btn"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
          color: "#fff",
          justifyContent: isOpen ? "flex-start" : "center",
          display: "flex",
          alignItems: "center",
          gap: isOpen ? "10px" : "0",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "12px",
          padding: "8px 16px",
          fontWeight: "500",
          fontSize: "0.875rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Icon placeholder - replace with <FaSignOutAlt /> */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon-hover"
          style={{
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
        {isOpen && (
          <span
            style={{
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            Log out
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;

{
  /* <button
        onClick={() => dispatch(toggleDrawer())}
        style={{
          padding: "8px 16px",
          border: "none",
          background: "transparent",
          color: "#6A4573",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#4b2f57")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6A4573")}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? "Close" : "Open"}
      </button> */
}
{
  /* Logout Button */
}
