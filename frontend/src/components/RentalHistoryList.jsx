import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const RentalHistoryList = ({ activeTab }) => {
  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const historyPayment = async () => {
      try {
        const user_id = localStorage.getItem("user_id"); //
        // const { user_id } = localStorage.getItem("user_id");
        const property_id = localStorage.getItem("property_id"); // Retrieve property_id
        const booking_id = localStorage.getItem("booking_id");
        const response = await axiosInstance.get(`/bookings`, {
          params: { user_id },
        });
        if (!response.data || !response.data.data) {
          throw new Error("Data booking tidak valid");
        }
        if (!booking_id) {
          console.error("Booking ID tidak ditemukan di localStorage");
          return;
        }
        console.log(response.data);
        setPayment(response.data);
        console.log("Response data" + response.data.data);
        console.log("Response data" + response.data.data.property_id);
        setRentals(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    historyPayment();
  }, []);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
          console.error("User ID tidak ditemukan di localStorage");
          return;
        }

        const response = await axiosInstance.get(`/bookings`, {
          params: { user_id },
        });

        if (!response.data || !response.data.data) {
          throw new Error("Data booking tidak valid");
        }

        console.log(response.data.data);
        setRentals(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // const filteredRentals = rentals.filter((rental) =>
  //   activeTab === "proses"
  //     ? rental.status === "Proses"
  //     : rental.status === "Disetujui" || rental.status === "Ditolak"
  // );

  const getFilteredRentals = () => {
    if (activeTab === "proses")
      return rentals.filter((r) => r.status === "Proses");
    return rentals.filter((r) => r.status !== "Proses");
  };
  const filteredRentals = getFilteredRentals();

  const handleNavigateToPayment = (rentalId) => {
    navigate(`/payment/${rentalId}`);
  };

  if (activeTab === "proses" && filteredRentals.length === 0) {
    return (
      <p className="text-center text-gray-600">
        Belum ada proses pengajuan sewa
      </p>
    );
  }

  if (activeTab !== "proses" && filteredRentals.length === 0) {
    return (
      <p className="text-center text-gray-600">
        Belum ada riwayat pengajuan sewa
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-center text-gray-600">Memuat data...</p>;
  }

  return (
    <div className="space-y-4">
      {filteredRentals.map((rental) => (
        <div
          key={rental._id}
          className="flex flex-col sm:flex-row items-center p-4 bg-white border rounded-md shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <img
            // src={import+rental.images[0]}
            alt={rental.name}
            className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-6"
          />
          <div className="flex-1 text-sm space-y-1 text-center sm:text-left">
            <h3 className="font-semibold text-[#193F3D] truncate">
              {rental.name}
            </h3>
            <p className="text-gray-600">
              {rental.start_date} - {rental.end_date}
              star end date
              {/* {rental.startDate} - {rental.endDate} */}
            </p>
            {/* <p className="text-gray-600">Durasi: {rental.duration}</p> */}
            <p className="font-semibold text-[#193F3D]">{rental.total_price}</p>
          </div>
          <button
            className={`w-full sm:w-auto px-6 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
              rental.status === "Disetujui"
                ? "bg-[#193F3D] text-white hover:bg-[#14534A]"
                : rental.status === "Ditolak"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() =>
              rental.status === "Disetujui" &&
              handleNavigateToPayment(rental._id)
            }
          >
            {rental.status}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RentalHistoryList;
