import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: "#e6f4ea", // Light green background
      color: "#202124", // Dark text for readability
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    icon: "✅",
  });
};

// Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      background: "#fce8e6", // Light red background
      color: "#202124", // Dark text for readability
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    icon: "❌",
  });
};
