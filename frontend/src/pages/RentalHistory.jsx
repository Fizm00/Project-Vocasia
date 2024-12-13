import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TabNavigation from "../components/TabNavigation";
import RentalHistoryList from "../components/RentalHistoryList";

const RentalHistory = () => {
  const [activeTab, setActiveTab] = useState("proses");
  const navigate = useNavigate();

  const handleBackToBooking = () => {
    navigate("/booking");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="max-w-5xl mx-auto py-6 px-6"> 
          <div className="flex items-center mb-4">
            <button
              onClick={handleBackToBooking}
              className="mr-4 text-[#193F3D] hover:text-green-600 text-xl font-bold"
            >
              <SlArrowLeft size={18} className="font-semibold" />
            </button>
            <h1 className="text-2xl font-semibold text-[#193F3D] transition-all duration-300 transform hover:translate-x-2">
              Daftar Pengajuan Sewa
            </h1>
          </div>
          <TabNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
          <RentalHistoryList activeTab={activeTab} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalHistory;