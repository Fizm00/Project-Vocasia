import axiosInstance from "../config/axiosInstance";

export const getPropertyById = async (id) => {
  try {
    const response = axiosInstance.get(`/property/${id}`);
    return response;
  } catch (error) {
    console.error(
      " Error Fetching data by id| getPropertyById - error:" + error
    );
    throw error.response;
  }
};

export const getProperty = async () => {
  try {
    const response = await axiosInstance.get("/properties");
    return response.data;
  } catch (error) {
    console.error(" Error Fetching data| getProperty - error:" + error);
    throw error.response;
  }
};

export const addProperty = async (formData) => {
  try {
    const response = await axiosInstance.post("/property", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saat menambahkan properti:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};