import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkForAuthenticateUser } from "../stores/authSlice";

const AuthGuard = ({ children, title, checkToken }) => {
  document.title = title || "ChatHive";

  const { user, isCheckingUser } = useSelector((state) => state?.auth || {});
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (checkToken) {
      dispatch(checkForAuthenticateUser());
    }
  }, [checkToken, location.pathname]);

  if ((checkToken && isCheckingUser) || isCheckingUser) {
    return <div>Loading...</div>;
  }

  if (!user && checkToken && !isCheckingUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
