import axiosInstance from "../config/axiosInstance";

export const getReviews = async () => {
  try {
    const response = await axiosInstance.get("/reviews");
    return response;
  } catch (error) {
    console.error(" Error Fetching data| getProperty - error:" + error);
    throw error.response;
  }
};

// export default getPropertyById;
