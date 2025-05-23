import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { checkForAuthenticateUser } from "../stores/authStore/authThunks";

const AuthGuard = ({ children, title = "ChatHive", checkToken }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token, isCheckingUser } = useSelector((state) => state?.auth || {});
  document.title = title;

  console.log(location);

  useEffect(() => {
    if (checkToken) {
      dispatch(checkForAuthenticateUser());
    }
  }, [checkToken, dispatch, location.pathname]);

  if (isCheckingUser) {
    return <div>Loading...</div>;
  }

  if (!token && !user && checkToken) {
    return <Navigate to="/login" />;
  }

  if (token && !checkToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
