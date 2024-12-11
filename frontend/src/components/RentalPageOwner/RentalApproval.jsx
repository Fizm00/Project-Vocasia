import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import OwnerTabNavigation from "../RentalPageOwner/OwnerTabNavigation";
import RentalApprovalList from "../RentalPageOwner/RentalApprovalList";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const RentalApproval = () => {
  const [activeTab, setActiveTab] = useState("proses");
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="max-w-5xl mx-auto py-8 px-6 mt-[-10px]">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={handleBackToDashboard}
              className="text-darkGreen text-xl hover:text-darkGreen/80"
            >
              <SlArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-semibold text-darkGreen">Pengajuan Sewa</h1>
          </div>
          <OwnerTabNavigation setActiveTab={setActiveTab} activeTab={activeTab} />
          <RentalApprovalList activeTab={activeTab} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentalApproval;