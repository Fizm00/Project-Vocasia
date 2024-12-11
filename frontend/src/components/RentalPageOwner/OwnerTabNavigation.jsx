import React from "react";

const OwnerTabNavigation = ({ setActiveTab, activeTab }) => {
  const tabClasses = (tab) =>
    `py-1 px-3 text-sm ${
      activeTab === tab
        ? "font-bold text-darkGreen border-b-2 border-[#193F3D] mb-2"
        : "text-gray-500"
    }`;

  return (
    <div className="mb-4 flex justify-start space-x-6">
      <button className={tabClasses("proses")} onClick={() => setActiveTab("proses")}>
        Proses
      </button>
      <button className={tabClasses("disetujui")} onClick={() => setActiveTab("disetujui")}>
        Disetujui
      </button>
      <button className={tabClasses("ditolak")} onClick={() => setActiveTab("ditolak")}>
        Ditolak
      </button>
    </div>
  );
};

export default OwnerTabNavigation;