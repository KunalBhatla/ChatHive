import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../stores/authStore/authSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state?.auth || {});
  return (
    <div style={{ height: "100%" }}>
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          dispatch(logoutUser());
          navigate("/login");
        }}
      >
        Log out
      </button>
      <div className="fs-3 fw-semibold">Home Page</div>
    </div>
  );
};

export default HomePage;
