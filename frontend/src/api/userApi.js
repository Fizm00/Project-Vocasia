import axiosInstance from "../config/axiosInstance";

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching data by id | getUserById - error:", error);
    throw error.response;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error Fetching data | getUsers - error:", error);
    throw error.response;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user data | updateUser - error:", error);
    throw error.response;
  }
};

