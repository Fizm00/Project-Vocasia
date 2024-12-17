import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const CatatanTambahan = ({ setTanggalMulai, setTanggalAkhir }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAjukanSewa = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const property_id = localStorage.getItem("property_id");

      const response = await axiosInstance.post("/booking", {
        user_id,
        property_id,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      });
      console.log("Booking Response:", response.data);
      console.log("Booking ID:", response.data.data.booking._id);

      alert("Booking Berhasil! Mengalihkan ke halaman pembayaran...");
      localStorage.setItem("booking_id", response.data.data.booking._id);
      // const getBookingId = localStorage.getItem("booking_id");
      navigate(`/payment/${response.data.data.booking._id}`);
    } catch (error) {
      console.error("Error saat mengajukan booking:", error);
      alert("Terjadi kesalahan saat mengajukan booking");
    }
    // navigate("/booking");
  };

  return (
    <section className="mt-4 mb-16 lg:ml-[2.5rem] space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Tanggal Akhir */}
      <div>
        <label className="block text-sm font-medium mb-1">Tanggal Akhir</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleAjukanSewa}
          className="bg-darkGreen text-white rounded-lg px-6 py-2 hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Pesan Sekarang -handleAjukanSewa
        </button>
      </div>
    </section>
  );
};

export default CatatanTambahan;
