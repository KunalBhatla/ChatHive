import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkForAuthenticateUser } from "../stores/authStore/authThunks";
import FullPageLoader from "../components/common/FullPageLoader";
import SidebarComponent from "../components/SidebarComponent";
import Header from "../components/Header";
import { initializeSocket } from "../stores/socketStore/socketThunks";

const AuthGuard = ({ children, title = "ChatHive", checkToken }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token, isCheckingUser } = useSelector((state) => state?.auth || {});
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  document.title = title;

  useEffect(() => {
    if (checkToken && token && !user) {
      dispatch(checkForAuthenticateUser());
      dispatch(initializeSocket());
    }
  }, [checkToken, dispatch, token, user, location.pathname]);

  if (isCheckingUser) {
    return <FullPageLoader />;
  }

  if (!token && !user && checkToken) {
    return <Navigate to="/login" />;
  }

  if (token && !checkToken) {
    return <Navigate to="/" />;
  }

  // Sidebar width dynamically based on toggle state
  const sidebarWidth = isOpen ? 250 : 60;

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      {checkToken && (
        <div
          className=" border-end"
          style={{
            width: `${sidebarWidth}px`,
            transition: "width 0.3s",
            // backgroundColor: "#f6eef7", // Soft lavender
            // zIndex: 1000,
            overflow: "hidden",
            backgroundColor: "#C8A2C8",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <SidebarComponent />
        </div>
      )}

      {/* Main content area */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ minWidth: 0 }}
      >
        <Header />

        <div className="p-2 flex-grow-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default AuthGuard;
