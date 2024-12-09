import React from "react";
import { useNavigate } from "react-router-dom";

const RentalHistoryList = ({ activeTab }) => {
  const navigate = useNavigate();

  const rentals = [
    {
      id: 1,
      name: "Kost Trinanda",
      startDate: "12 Mar 2023",
      endDate: "12 Apr 2023",
      duration: "1 Bulan",
      price: "Rp 1.500.000 / bulan",
      image: "/1-kostImage.png",
      status: "Proses",
    },
    {
      id: 2,
      name: "Kost Sultan Kencana",
      startDate: "15 Mar 2023",
      endDate: "15 Apr 2023",
      duration: "1 Bulan",
      price: "Rp 1.200.000 / bulan",
      image: "/2-kostImage.png",
      status: "Disetujui",
    },
    {
      id: 3,
      name: "Kost Rahayu",
      startDate: "20 Mar 2023",
      endDate: "20 Apr 2023",
      duration: "1 Bulan",
      price: "Rp 2.000.000 / bulan",
      image: "/3-kostImage.png",
      status: "Ditolak",
    },
    {
      id: 4,
      name: "Kost Keraton",
      startDate: "22 Mar 2023",
      endDate: "22 May 2023",
      duration: "2 Bulan",
      price: "Rp 1.000.000 / bulan",
      image: "/4-kostImage.png",
      status: "Proses",
    },
    {
      id: 5,
      name: "Kost Harmoni",
      startDate: "25 Mar 2023",
      endDate: "25 Apr 2023",
      duration: "1 Bulan",
      price: "Rp 1.800.000 / bulan",
      image: "/5-kostImage.png",
      status: "Disetujui",
    },
    {
      id: 6,
      name: "Kost Eden",
      startDate: "30 Mar 2023",
      endDate: "30 Apr 2023",
      duration: "1 Bulan",
      price: "Rp 1.700.000 / bulan",
      image: "/6-kostImage.png",
      status: "Ditolak",
    },
  ];

  const filteredRentals = rentals.filter((rental) =>
    activeTab === "proses"
      ? rental.status === "Proses"
      : rental.status === "Disetujui" || rental.status === "Ditolak"
  );

  const handleNavigateToPayment = (rentalId) => {
    navigate(`/payment/${rentalId}`);
  };

  return (
    <div className="space-y-4">
      {filteredRentals.map((rental) => (
        <div
          key={rental.id}
          className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm sm:w-full md:w-full mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <img
              src={rental.image}
              alt={rental.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#193F3D]">{rental.name}</h3>
              <p className="text-xs text-gray-700">Tanggal Masuk: {rental.startDate}</p>
              <p className="text-xs text-gray-700">Tanggal Keluar: {rental.endDate}</p>
              <p className="text-xs text-gray-700">Durasi: {rental.duration}</p>
              <p className="text-sm font-bold text-[#193F3D]">{rental.price}</p>
            </div>
          </div>
          <div className="text-right">
            <button
              className={`mt-2 w-32 px-4 py-2 text-sm rounded-full ${
                rental.status === "Disetujui"
                  ? "bg-[#193F3D] text-white hover:bg-[#14534A] hover:shadow-md hover:scale-105 transition-all duration-300"
                  : rental.status === "Ditolak"
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() =>
                rental.status === "Disetujui" && handleNavigateToPayment(rental.id)
              }
            >
              {rental.status}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalHistoryList;