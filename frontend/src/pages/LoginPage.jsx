import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/register")}>Go Register</button>;
      <div> LoginPage</div>
    </div>
  );
};

export default LoginPage;
