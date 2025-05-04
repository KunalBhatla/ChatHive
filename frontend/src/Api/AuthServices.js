import { axiosInstance } from ".";

export const RegisterUserApi = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await axiosInstance.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
