import axiosInstance from "../config/axiosInstance";

export const getBookingById = async (id) => {
  try {
    const response = axiosInstance.get(`/booking/${id}`);
    return response;
  } catch (error) {
    console.error(
      " Error Fetching data by id| getBookingById - error:" + error
    );
    throw error.response;
  }
};
export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings");
    return response.data;
  } catch (error) {
    console.error(" Error Fetching data| getBookings - error:" + error);
    throw error.response;
  }
};


