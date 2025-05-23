import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../stores/authStore/authSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state?.auth || {});
  console.log("selector ->", selector);
  return (
    <div>
      <button
        onClick={() => {
          dispatch(logoutUser());
          navigate("/login");
        }}
      >
        Log out
      </button>
      <div> HomePage</div>
    </div>
  );
};

export default HomePage;
