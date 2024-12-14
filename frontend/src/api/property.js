import axiosInstance from "../config/axiosInstance";

export const getProperty = async () => {
  try {
    const response = await axiosInstance.get("/properties");
    console.log("fetched property", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    throw error;
  }
};
