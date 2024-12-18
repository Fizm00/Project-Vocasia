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

  // const rentals = [
  //   {
  //     id: 1,
  //     name: "Kost Trinanda",
  //     startDate: "12 Mar 2023",
  //     endDate: "12 Apr 2023",
  //     duration: "1 Bulan",
  //     price: "Rp 1.500.000 / bulan",
  //     image: "/1-kostImage.png",
  //     status: "Proses",
  //   },
  //   {
  //     id: 2,
  //     name: "Kost Sultan Kencana",
  //     startDate: "15 Mar 2023",
  //     endDate: "15 Apr 2023",
  //     duration: "1 Bulan",
  //     price: "Rp 1.200.000 / bulan",
  //     image: "/2-kostImage.png",
  //     status: "Disetujui",
  //   },
  //   {
  //     id: 3,
  //     name: "Kost Rahayu",
  //     startDate: "20 Mar 2023",
  //     endDate: "20 Apr 2023",
  //     duration: "1 Bulan",
  //     price: "Rp 2.000.000 / bulan",
  //     image: "/3-kostImage.png",
  //     status: "Ditolak",
  //   },
  //   {
  //     id: 4,
  //     name: "Kost Keraton",
  //     startDate: "22 Mar 2023",
  //     endDate: "22 May 2023",
  //     duration: "2 Bulan",
  //     price: "Rp 1.000.000 / bulan",
  //     image: "/4-kostImage.png",
  //     status: "Proses",
  //   },
  //   {
  //     id: 5,
  //     name: "Kost Harmoni",
  //     startDate: "25 Mar 2023",
  //     endDate: "25 Apr 2023",
  //     duration: "1 Bulan",
  //     price: "Rp 1.800.000 / bulan",
  //     image: "/5-kostImage.png",
  //     status: "Disetujui",
  //   },
  //   {
  //     id: 6,
  //     name: "Kost Eden",
  //     startDate: "30 Mar 2023",
  //     endDate: "30 Apr 2023",
  //     duration: "1 Bulan",
  //     price: "Rp 1.700.000 / bulan",
  //     image: "/6-kostImage.png",
  //     status: "Ditolak",
  //   },
  // ];

  const filteredRentals = rentals.filter((rental) =>
    activeTab === "proses"
      ? rental.status === "Proses"
      : rental.status === "Disetujui" || rental.status === "Ditolak"
  );

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
      {rentals.map((rental) => (
        <div
          key={rental._id}
          className="flex flex-col sm:flex-row items-center p-4 bg-white border rounded-md shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <img
            src={rental.image}
            alt={rental.name}
            className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-6"
          />
          <div className="flex-1 text-sm space-y-1 text-center sm:text-left">
            <h3 className="font-semibold text-[#193F3D] truncate">
              {rental.name}
            </h3>
            <p className="text-gray-600">
              {rental.startDate} - {rental.endDate}
            </p>
            <p className="text-gray-600">Durasi: {rental.duration}</p>
            <p className="font-semibold text-[#193F3D]">{rental.price}</p>
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
              handleNavigateToPayment(rental.id)
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
