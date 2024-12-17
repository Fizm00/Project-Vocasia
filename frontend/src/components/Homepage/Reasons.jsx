import React from "react";
import { useNavigate } from "react-router-dom";

const Reasons = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/search");
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-center py-16 px-8 bg-white">
      {/* Gambar */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0 md:ml-36 transition-all duration-500 hover:scale-105">
        <img
          src="/7-kostImage.png"
          alt="Property Image"
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Teks */}
      <div className="w-full md:w-1/2 md:pl-8 md:ml-[-10px] lg:ml-[-20px] flex flex-col items-start justify-center">
        <h2 className="text-3xl font-extrabold mb-4 text-[#193F3D]">
          Kenapa Harus AnakKost?
        </h2>
        <p className="text-justify mb-6 text-[#193F3D]">
          Mencari tempat kost yang cocok tak pernah semudah ini! AnakKost menawarkan berbagai pilihan kost dengan fasilitas terbaik, harga terjangkau, dan lokasi strategis untuk menunjang aktivitas Anda. Temukan kost impian Anda dengan hanya beberapa klik!
        </p>
        <button
          onClick={handleExploreClick}
          className="px-6 py-2 bg-[#193F3D] text-white rounded-full hover:bg-green-700"
        >
          Jelajahi Kost Sekarang
        </button>
      </div>
    </section>
  );
};

export default Reasons;
