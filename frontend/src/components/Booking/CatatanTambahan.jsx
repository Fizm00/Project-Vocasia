import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const CatatanTambahan = ({ setCatatan, tanggalMulai, durasi }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAjukanSewa = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await axiosInstance.post("/booking", {
        user_id,
        property_id: id,
        start_date: tanggalMulai,
        end_date: durasi,
      });

      console.log("Booking Response:", response.data);
      if (response.status === 200) {
        alert("Booking Berhasil! Mengalihkan ke halaman pembayaran...");
        navigate(`/pembayaran/${response.data.booking_id}`);
      }
    } catch (error) {
      console.error("Error saat mengajukan booking:", error);
      alert("Terjadi kesalahan saat mengajukan booking");
    }
    navigate("/Riwayat-sewa");
  };

  return (
    <section className="mt-4 mb-16 lg:ml-[2.5rem] space-y-4">
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
