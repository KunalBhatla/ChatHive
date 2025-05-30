import { axiosInstance } from ".";

export const sendMessageService = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid message data");
  }

  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosInstance.post("/chat/send", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Registration API error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to register user. Please try again."
    );
  }
};

export const fetchParticipantsMessagesService = async (data) => {
  try {
    const response = await axiosInstance.post("/chat/messages", data);
    return response.data;
  } catch {
    console.error("fetchParticipantsMessagesService API error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to register user. Please try again."
    );
  }
};
