import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../config/axiosInstance";

const PaymentChoice = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const virtualAccounts = [
    { id: 1, name: "BRI", logo: "/logos/bri2.png" },
    { id: 2, name: "BNI", logo: "/logos/bni1.png" },
    { id: 3, name: "BCA", logo: "/logos/bca.png" },
    { id: 4, name: "Mandiri", logo: "/logos/mandiri2.png" },
  ];

  const [paymentChoice, setPaymentChoice] = useState(""); // State to store the selected payment choice

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const booking_id = localStorage.getItem("booking_id");
  //       const response = await axiosInstance.get("/booking/" + booking_id);
  //       console.log("URL Payment:", response.data.data.url_payment);
  //       setPaymentChoice(response.data.data.url_payment);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const getPayment = localStorage.getItem("payment_url");

  useEffect(() => {
    if (paymentChoice && paymentChoice.id) {
      // window.open(getPayment, "_blank");
      window.location.href = getPayment;
      // target="_blank";
      // navigate(getPayment);
    } else if (paymentChoice === "COD") {
      window.location.href = getPayment;
      // navigate(getPayment);
    }
  }, [paymentChoice, navigate, getPayment]);

  return (
    <div className="mt-4 lg:w-[70%] lg:ml-[5rem] lg:px-10 pb-10">
      {/* Payment Choice Section */}
      <h2 className="text-lg font-bold text-gray-800">
        Pilih Metode Pembayaran
      </h2>

      {/* Virtual Account Section */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-800">Virtual Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {virtualAccounts.map((bank) => (
            <div
              key={bank.id}
              onClick={() => setPaymentChoice(bank)} // Set the selected bank object
              className={`cursor-pointer flex flex-col items-center justify-center py-6 border ${
                paymentChoice && paymentChoice.id === bank.id
                  ? "border-2 border-green-500"
                  : "border-gray-300"
              } hover:shadow-lg transition-shadow`}
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
      </div>

      {/* COD Section */}
      {/* <h3 className="text-md font-semibold text-gray-800 mt-4">
        Cash On Delivery
      </h3>

      <div
        onClick={() => setPaymentChoice("COD")}
        className={`flex items-center justify-between border rounded-lg px-4 py-5 mt-3 cursor-pointer hover:shadow-lg transition-shadow ${
          paymentChoice === "COD"
            ? "border-2 border-green-500"
            : "border-gray-300"
        }`}
      >
        <div className="flex items-center lg:px-10 space-x-5">
          <span className="font-bold text-lg text-gray-800">COD</span>
          <span className="text-sm text-gray-500">
            (Bayar di tempat saat check-in)
          </span>
        </div>
      </div> */}

      {/* Bayar Button */}
      <div className="mt-8 mb-8">
        {/* <button
          onClick={handleBayar}
          className="w-full bg-darkGreen text-white text-center px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Bayar
        </button> */}
      </div>
    </div>
  );
};

export default PaymentChoice;
