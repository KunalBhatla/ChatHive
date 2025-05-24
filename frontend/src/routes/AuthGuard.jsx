import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { checkForAuthenticateUser } from "../stores/authStore/authThunks";
import FullPageLoader from "../components/common/FullPageLoader";
import { toggleDrawer } from "../stores/sidebarStore/sidebarSlice";
import SidebarComponent from "../components/SidebarComponent";
import Header from "../components/Header";

const AuthGuard = ({ children, title = "ChatHive", checkToken }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token, isCheckingUser } = useSelector((state) => state?.auth || {});
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  document.title = title;

  useEffect(() => {
    if (checkToken && token && !user) {
      dispatch(checkForAuthenticateUser());
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
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar on the left */}
      {checkToken && (
        <div
          style={{
            width: isOpen ? "250px" : "60px",
            transition: "width 0.3s",
            backgroundColor: "#C8A2C8",
            overflow: "hidden",
          }}
        >
          <SidebarComponent />
        </div>
      )}

      {/* Right content area */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header fixed height */}
        <div>
          <Header />
        </div>

        <div
          style={{
            height: "calc(100vh - 60px)",
            width: `calc(100vw - ${isOpen ? 250 : 60}px)`,
            overflow: "hidden",
            padding: "5px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthGuard;
