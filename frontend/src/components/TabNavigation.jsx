import React from "react";

const TabNavigation = ({ setActiveTab, activeTab }) => {
  return (
    <div className="flex justify-center sm:justify-start border-b mb-4 space-x-6">
      <button
        className={`py-1 px-3 text-sm ${
          activeTab === "proses"
            ? "font-bold text-[#193F3D] border-b-2 border-[#193F3D]"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("proses")}
      >
        Proses
      </button>
      <button
        className={`py-1 px-3 text-sm ${
          activeTab === "riwayat"
            ? "font-bold text-[#193F3D] border-b-2 border-[#193F3D]"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("riwayat")}
      >
        Riwayat
      </button>
    </div>
  );
};

export default TabNavigation;