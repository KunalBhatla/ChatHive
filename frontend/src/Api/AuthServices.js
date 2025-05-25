import { axiosInstance } from ".";

export const RegisterUserApi = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid registration data");
  }

  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosInstance.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    // Optional: Log error for debugging
    console.error("Registration API error:", error);

    // Re-throw with a clearer message
    throw new Error(
      error?.response?.data?.message || "Failed to register user. Please try again."
    );
  }
};
