const COLORS = {
  darkPurple: "#6A4573",
  peach: "#FFDDC1",
};

const TypingIndicator = ({ userName }) => {
  return (
    <div
      className="px-3 py-1 mb-2 rounded-pill"
      style={{
        backgroundColor: COLORS.peach,
        color: COLORS.darkPurple,
        maxWidth: "fit-content",
        fontStyle: "italic",
        fontSize: "0.85rem",
        userSelect: "none",
      }}
    >
      {userName} is typing...
    </div>
  );
};

export default TypingIndicator;
