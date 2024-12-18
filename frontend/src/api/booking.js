import axiosInstance from "../config/axiosInstance";

const getBookings = async (token) => {
  try {
    const response = await axiosInstance(
      `${import.meta.env.VITE_BASE_API_URL}/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("email", JSON.stringify(response.data.data.email));
    localStorage.setItem("name", JSON.stringify(response.data.data.name));
    localStorage.setItem("user", JSON.stringify(response.data.data.user_id));
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

const getBookingsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/booking/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

const createBooking = async (data) => {
  const { user_id, property_id, start_date, end_date } = data;

  // Validasi data
  if (!user_id || !property_id || !start_date || !end_date) {
    throw new Error("Semua field harus diisi!");
  }
  try {
    const response = await axiosInstance.post("/booking", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

export { getBookings, getBookingsById, createBooking };

// export const getBookingById = async (id) => {
 //  try {
 //    const response = axiosInstance.get(`/booking/${id}`);
 //    return response;
 //  } catch (error) {
//     console.error(
  //     " Error Fetching data by id| getBookingById - error:" + error
 //    );
//     throw error.response;
//   }
// };
// export const getBookings = async () => {
  // try {
   //  const response = await axiosInstance.get("/bookings");
   //  return response.data;
 //  } catch (error) {
   //  console.error(" Error Fetching data| getBookings - error:" + error);
   //  throw error.response;
  // }
// };
