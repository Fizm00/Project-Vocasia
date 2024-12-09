import React from "react";
import { useNavigate } from "react-router-dom";

const Reasons = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/search");
  };

  return (
    <section className="flex justify-between items-center py-16 px-8 bg-white">
      <div className="w-1/2 pr-8 transition-all duration-500 hover:translate-x-10">
        <h2 className="text-3xl font-extrabold mb-8 text-[#193F3D]">
          Kenapa Harus AnakKost?
        </h2>
        <p className="text-base mb-8 text-[#193F3D]">
          Mencari tempat kost yang cocok tak pernah semudah ini! AnakKost menawarkan berbagai pilihan kost dengan fasilitas terbaik, harga terjangkau, dan lokasi strategis untuk menunjang aktivitas Anda. Temukan kost impian Anda dengan hanya beberapa klik!
        </p>
        <button
          onClick={handleExploreClick}
          className="mt-4 px-6 py-2 bg-[#193F3D] text-white rounded-full hover:bg-green-700"
        >
          Jelajahi Kost Sekarang
        </button>
      </div>
      <div className="w-1/3">
        <img
          src="/7-kostImage.png"
          alt="Property Image"
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default Reasons;