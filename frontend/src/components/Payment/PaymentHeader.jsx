import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PaymentHeader = () => (
  <div className="lg:px-16">
    {/* Header Grid */}
    <div className="grid grid-cols-[auto,2fr] items-center gap-4">
      <button
        className="text-darkGreen text-xl transition-transform transform hover:scale-110"
        aria-label="Kembali ke halaman sebelumnya"
      >
        <FaArrowLeft />
      </button>
      <h1 className="text-3xl font-bold text-gray-800 ml-4">Pembayaran</h1>
    </div>

    {/* Garis Horizontal */}
    <div className="mt-4 w-full lg:w-[71%] lg:ml-[3.5rem]">
      <hr className="border-gray-300 transition-width duration-300 ease-in-out" />
    </div>
  </div>
);

export default PaymentHeader;
