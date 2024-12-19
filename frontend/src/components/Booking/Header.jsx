import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div>
      <div className="grid grid-cols-[auto,1fr] items-center gap-4">
        <button
          onClick={handleBackClick} 
          className="text-darkGreen text-xl transition-transform transform hover:scale-110"
          aria-label="Kembali ke halaman sebelumnya"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Pengajuan Sewa</h1>
      </div>
      <div className="mt-4 w-full lg:w-[70%] lg:ml-[2.5rem]">
        <hr className="border-gray-300 transition-width duration-300 ease-in-out" />
      </div>
    </div>
  );
};

export default Header;