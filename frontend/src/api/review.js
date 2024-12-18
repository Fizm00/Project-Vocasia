import axiosInstance from "../config/axiosInstance";

export const postReview = async (reviewData) => {
    try {
      const response = await axiosInstance.post("/review", reviewData);
      return response.data; 
    } catch (error) {
      console.error("Error saat mengirim review:", error.response?.data || error.message);
      throw error.response?.data || error; 
    }
  };

export const getReviews = async () => {
  try {
    const response = await axiosInstance.get("/reviews");
    return response;
  } catch (error) {
    console.error(" Error Fetching data| getProperty - error:" + error);
    throw error.response;
  }
};