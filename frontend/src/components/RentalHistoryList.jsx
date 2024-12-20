import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const RentalHistoryList = ({ activeTab }) => {
  const [rentals, setRentals] = useState([]);
  const [properties, setProperties] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
          console.error("User ID tidak ditemukan di localStorage");
          return;
        }

        // Fetch bookings berdasarkan user_id
        const response = await axiosInstance.get(`/bookings`, {
          params: { user_id }, // Hanya ambil bookings milik user yang login
        });

        if (!response.data || !response.data.data) {
          throw new Error("Data booking tidak valid");
        }

        const bookings = response.data.data.filter(
          (booking) => booking.user_id === user_id
        ); // Filter untuk memastikan hanya booking dari user yang login
        setRentals(bookings);

        const propertyIds = bookings.map((booking) => booking.property_id);
        const uniquePropertyIds = [...new Set(propertyIds)];

        const propertyResponses = await Promise.all(
          uniquePropertyIds.map((property_id) =>
            axiosInstance.get(`/property/${property_id}`)
          )
        );

        const propertyData = propertyResponses.reduce((acc, res) => {
          if (res.data && res.data.success) {
            acc[res.data.data._id] = res.data.data;
          }
          return acc;
        }, {});

        setProperties(propertyData);
      } catch (error) {
        console.error("Error fetching bookings or properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getFilteredRentals = () => {
    if (activeTab === "proses")
      return rentals.filter((r) => r.status === "Proses");
    return rentals.filter((r) => r.status !== "Proses");
  };

  const filteredRentals = getFilteredRentals();

  const handleNavigateToDetails = (rentalId) => {
    navigate(`/success-book/${rentalId}`);
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Memuat data...</p>;
  }

  if (filteredRentals.length === 0) {
    const emptyMessage =
      activeTab === "proses"
        ? "Belum ada proses pengajuan sewa"
        : "Belum ada riwayat pengajuan sewa";
    return <p className="text-center text-gray-600">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4">
      {filteredRentals.map((rental) => {
        const property = properties[rental.property_id] || {};
        return (
          <div
            key={rental._id}
            className="flex flex-col sm:flex-row items-center p-4 bg-white border rounded-md shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            onClick={() => handleNavigateToDetails(rental._id)}
          >
            <img
              src={property.images?.[0] || "https://via.placeholder.com/100"}
              alt={property.name || "Kost"}
              className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-6"
            />
            <div className="flex-1 text-sm space-y-1 text-center sm:text-left">
              <h3 className="font-semibold text-[#193F3D] truncate">
                {property.name || "Nama Kost Tidak Diketahui"}
              </h3>
              <p className="text-gray-500">
                <span>Tanggal Mulai: </span>
                <span className="mr-4">
                  {rental.start_date
                    ? new Date(rental.start_date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </span>
                <span>Tanggal Berakhir: </span>
                <span>
                  {rental.end_date
                    ? new Date(rental.end_date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </p>
              <p className="text-md font-bold text-[#193F3D]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(rental.total_price)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RentalHistoryList;