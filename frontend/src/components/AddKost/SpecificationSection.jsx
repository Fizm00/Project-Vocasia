import React from "react";

const SpecificationsSection = ({
  specifications,
  handleIncrement,
  handleDecrement,
  includedFacilities,
  setIncludedFacilities,
  rentalPackages,
  setRentalPackages,
}) => {
  const handleFacilityChange = (facility) => {
    const updatedFacilities = includedFacilities.includes(facility)
      ? includedFacilities.filter((f) => f !== facility)
      : [...includedFacilities, facility];
    setIncludedFacilities(updatedFacilities);
  };

  const handlePackageChange = (packageOption) => {
    const updatedPackages = rentalPackages.includes(packageOption)
      ? rentalPackages.filter((p) => p !== packageOption)
      : [...rentalPackages, packageOption];
    setRentalPackages(updatedPackages);
  };

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Sertakan spesifikasi tempatmu!</h2>
        <hr className="border-gray-300 mb-4" />
        {[
          { label: "Jumlah Kamar", key: "kamar" },
          { label: "Kamar Mandi", key: "mandi" },
          { label: "Parkiran", key: "parkiran" },
        ].map((spec) => (
          <div className="flex items-center mb-2" key={spec.key}>
            <button
              className="border px-3 py-1 rounded-l"
              onClick={() => handleDecrement(spec.key)}
            >
              -
            </button>
            <input
              type="number"
              value={specifications[spec.key]}
              className="border-t border-b w-16 text-center"
              readOnly
            />
            <button
              className="border px-3 py-1 rounded-r"
              onClick={() => handleIncrement(spec.key)}
            >
              +
            </button>
            <span className="ml-2">{spec.label}</span>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Beri tahu spesifikasi kamarmu!</h2>
        <hr className="border-gray-300 mb-4" />
        <p className="text-sm text-gray-400 mb-4">Fasilitas termasuk kamar</p>
        {["Termasuk Listrik", "Termasuk Wifi"].map((facility) => (
          <div className="flex items-center mb-2" key={facility}>
            <input
              type="checkbox"
              className="mr-2"
              checked={includedFacilities.includes(facility)}
              onChange={() => handleFacilityChange(facility)}
            />
            <span>{facility}</span>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Paket Sewa Tempatmu</h2>
        <hr className="border-gray-300 mb-4" />
        {["Harian", "Bulanan"].map((packageOption) => (
          <div className="flex items-center mb-2" key={packageOption}>
            <input
              type="checkbox"
              name="paket"
              className="mr-2"
              checked={rentalPackages.includes(packageOption)}
              onChange={() => handlePackageChange(packageOption)}
            />
            <span>{packageOption}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationsSection;
