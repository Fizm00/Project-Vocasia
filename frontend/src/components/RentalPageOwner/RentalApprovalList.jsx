import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const RentalApprovalList = ({ activeTab }) => {
  const [rentals, setRentals] = useState([
    {
      id: 1,
      name: "Kost Trinanda",
      startDate: "12 Mar 2023",
      duration: "1 Bulan",
      price: "Rp 1.500.000 / bulan",
      userName: "John Doe",
      status: "proses",
      imageUrl: "/1-kostImage.png",
    },
    {
      id: 2,
      name: "Kost Sultan Kencana",
      startDate: "15 Mar 2023",
      duration: "1 Bulan",
      price: "Rp 1.200.000 / bulan",
      userName: "Jane Smith",
      status: "proses",
      imageUrl: "/2-kostImage.png",
    },
    {
      id: 3,
      name: "Kost Rahayu",
      startDate: "20 Mar 2023",
      duration: "1 Bulan",
      price: "Rp 2.000.000 / bulan",
      userName: "Michael Johnson",
      status: "proses",
      imageUrl: "/3-kostImage.png",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedRentals = rentals.map((rental) =>
      rental.id === id ? { ...rental, status: newStatus } : rental
    );
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
  };

  const handleDelete = (id) => {
    const updatedRentals = rentals.filter((rental) => rental.id !== id);
    setRentals(updatedRentals);
    localStorage.setItem("rentals", JSON.stringify(updatedRentals));
  };

  const filteredRentals = rentals.filter(
    (rental) => rental.status.toLowerCase() === activeTab
  );

  return (
    <div className="space-y-3">
      {filteredRentals.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada pengajuan sewa yang {activeTab === "proses" ? "diproses" : activeTab}
        </p>
      ) : (
        filteredRentals.map((rental) => (
          <div
            key={rental.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white border rounded-lg shadow-sm transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <div className="w-full sm:w-1/5 mb-3 sm:mb-0 sm:mr-4">
              <img
                src={rental.imageUrl}
                alt={rental.name}
                className="min-w-28 h-20 object-cover rounded-lg mx-auto sm:mx-0"
              />
            </div>

            <div className="w-full sm:w-4/5 sm:ml-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-[#193F3D]">
                  {rental.name} -{" "}
                  <button
                    className="text-darkGreen bg-transparent border-2 border-darkGreen px-2 py-1 text-xs rounded-full"
                    disabled
                  >
                    {rental.userName}
                  </button>
                </h3>
              </div>
              <div className="mt-1">
                <p className="text-xs text-gray-700">Tanggal Masuk: {rental.startDate}</p>
                <p className="text-xs text-gray-700">Durasi: {rental.duration}</p>
                <p className="text-xs font-extrabold text-darkGreen">{rental.price}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 w-full mt-2">
              {activeTab === "proses" && (
                <>
                  <button
                    onClick={() => handleStatusChange(rental.id, "ditolak")}
                    className="px-4 py-1 bg-red-500 text-white rounded-full text-xs w-full sm:w-32 mb-2 sm:mb-0 hover:bg-red-600 hover:scale-105 transform transition-transform duration-300 ease-in-out"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => handleStatusChange(rental.id, "disetujui")}
                    className="px-4 py-1 bg-darkGreen text-white rounded-full text-xs w-full sm:w-32 hover:bg-darkGreen/80 hover:scale-105 transform transition-transform duration-300 ease-in-out"
                  >
                    Setujui
                  </button>
                </>
              )}
              {rental.status === "disetujui" && (
                <button className="px-4 py-1 bg-darkGreen text-white rounded-full text-xs w-full sm:w-32">
                  Telah Disetujui
                </button>
              )}
              {rental.status === "ditolak" && (
                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-3">
                  <button
                    onClick={() => handleDelete(rental.id)}
                    className="flex items-center justify-center space-x-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white hover:text-white rounded-full text-xs w-full sm:w-auto"
                  >
                    <FaTrash size={14} />
                    <span>Hapus</span>
                  </button>

                  <button className="px-4 py-1 bg-gray-200 text-red-500 rounded-full text-xs w-full sm:w-32">
                    Telah Ditolak
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RentalApprovalList;