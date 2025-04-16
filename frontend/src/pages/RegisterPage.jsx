import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div> RegisterPage</div>
      <button onClick={() => navigate("/login")}>Go Login</button>
    </div>
  );
};

export default RegisterPage;
