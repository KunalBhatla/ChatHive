import { FaComments } from "react-icons/fa";

const COLORS = {
  lavender: "#C8A2C8",
  softLavender: "#F6EEF7",
  darkPurple: "#6A4573",
};

const NoSelectedUser = () => {
  return (
    <div
      className="d-flex flex-grow-1 justify-content-center align-items-center text-center px-4"
      style={{
        height: "100%",
        backgroundColor: COLORS.softLavender,
        color: COLORS.darkPurple,
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: COLORS.lavender,
            color: "#fff",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FaComments size={48} />
        </div>
        <h4 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Let’s Talk</h4>
        <p style={{ maxWidth: 360, margin: "0 auto", fontSize: "1rem", opacity: 0.75 }}>
          Select a user from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoSelectedUser;
