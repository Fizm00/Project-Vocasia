import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto my-6 bg-cover bg-center rounded-lg shadow-lg relative"
      style={{
        backgroundImage: "url('/bannerImage.png')",
        height: "220px",
        width: "98%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

      <div className="relative z-10 flex flex-col justify-center items-start text-white px-6 py-4 h-full">
        <h2 className="text-3xl lg:text-2xl font-bold mb-1 text-center transition-all duration-300 ease-in-out hover:scale-110">
          Gabung
        </h2>
        <h2 className="text-3xl lg:text-2xl font-bold mb-5 text-center transition-all duration-300 ease-in-out hover:scale-110">
          Bersama Kami!
        </h2>
        <p className="text-xs lg:text-sm mb-5 text-center">
          Daftarkan segera usaha kost anda!
        </p>
        <button
          onClick={handleClick}
          className="bg-white text-[#193F3D] font-bold px-4 py-2 rounded-full hover:bg-gray-200"
        >
          Daftar
        </button>
      </div>
    </div>
  );
};

export default Banner;