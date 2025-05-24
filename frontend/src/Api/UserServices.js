import { axiosInstance } from ".";

export const updateCurrentUserDetailsService = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid update data");
  }

  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosInstance.patch("/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update user error:", error);

    throw new Error(
      error?.response?.data?.message || "Failed to update profile. Please try again."
    );
  }
};
