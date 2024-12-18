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

// export default getPropertyById;
