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
      localStorage.setItem("payment_url", response.data.data.payment_url);

      navigate(`/payment/${response.data.data.booking._id}`);
    } catch (error) {
      console.error("Error saat mengajukan booking:", error);
      alert("Terjadi kesalahan saat mengajukan booking");
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setTanggalMulai(value); 
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    setTanggalAkhir(value); 
  };

  return (
    <section className="mt-4 mb-16 lg:ml-[2.5rem] space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tanggal Akhir</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleAjukanSewa}
          className="bg-darkGreen text-white rounded-lg px-6 py-2 hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Pesan Sekarang
        </button>
      </div>
    </section>
  );
};

export default CatatanTambahan;