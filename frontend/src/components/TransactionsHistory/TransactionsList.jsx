import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const TransactionsList = ({ transactions }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center mb-8" data-aos="fade-up">
        <button
          onClick={() => window.history.back()}
          className="text-gray-800 hover:text-darkGreen font-bold flex items-center"
        >
          <FaArrowLeft className="text-2xl mr-2" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Riwayat Transaksi</h2>
      </div>

      {/* Daftar Transaksi */}
      <div className="divide-y divide-gray-300">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center py-6"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={transaction.image}
              alt={transaction.name}
              className="w-24 h-24 rounded-lg object-cover mr-6"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{transaction.name}</h3>
              <p className="text-sm text-gray-600">
                Check In: {transaction.checkIn} | Durasi: {transaction.duration} | Guests:{" "}
                {transaction.guests}
              </p>
              <p className="text-sm font-medium text-gray-800 mt-2">{transaction.price}</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-5 py-2 border border-darkGreen bg-white text-darkGreen rounded-md hover:bg-gray-200">
                Chat Pemilik
              </button>
              <button className="px-5 py-2 bg-darkGreen text-white rounded-md hover:bg-green-700">
                Cetak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
