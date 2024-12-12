import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentChoice = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const virtualAccounts = [
    { name: "BRI", logo: "/logos/bri2.png" },
    { name: "BNI", logo: "/logos/bni1.png" },
    { name: "BCA", logo: "/logos/bca.png" },
    { name: "Mandiri", logo: "/logos/mandiri2.png" },
  ];

  // Fungsi untuk menangani klik tombol Bayar
  const handleBayar = () => {
    // Lakukan proses validasi atau logika tambahan jika diperlukan
    // Kemudian navigasikan ke halaman success-book
    navigate("/success-book");
  };

  return (
    <div className="mt-4 lg:w-[70%] lg:ml-[5rem] lg:px-10 pb-10">
      {/* Virtual Account Section */}
      <h2 className="text-lg font-bold text-gray-800">Virtual Account</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {virtualAccounts.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg py-6 hover:shadow-lg transition-shadow"
          >
            <img
              src={bank.logo}
              alt={bank.name}
              className="w-16 h-16 object-contain"
            />
            <span className="text-md font-semibold text-gray-400 mt-4">
              {bank.name}
            </span>
          </div>
        ))}
      </div>
      {/* Horizontal Line */}
      <div className="mt-6">
        <hr className="border-gray-300" />
      </div>
      {/* COD Section */}
      <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-5 mt-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center lg:px-10 space-x-5">
          <span className="font-bold text-lg text-gray-800">COD</span>
          <span className="text-sm text-gray-500">
            (Bayar di tempat saat check-in)
          </span>
        </div>
      </div>
      {/* Bayar Button */}
      <div className="mt-8 mb-8">
        <button
          onClick={handleBayar}
          className="w-full bg-darkGreen text-white text-center px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default PaymentChoice;
