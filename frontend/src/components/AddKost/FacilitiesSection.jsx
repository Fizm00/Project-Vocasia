import React, { useState } from "react";

const FacilitiesSection = ({ onChange }) => {
  const facilitiesData = [
    { key: 'Full Furniture', label: 'Furniture Lengkap' },
    { key: 'Kamar Mandi Dalam', label: 'Kamar Mandi Dalam' },
    { key: 'Parkiran', label: 'Lahan Parkir' },
    { key: 'AC', label: 'AC' },
    { key: 'Free Wifi', label: 'Free Wifi' },
    { key: 'Dapur', label: 'Dapur Umum' },
    { key: 'Kulkas', label: 'Kulkas' },
    { key: 'Kipas Angin', label: 'Kipas Angin' },
    { key: 'Penjaga', label: 'Penjaga' },
  ];

  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const handleFacilityChange = (key) => {
    const updatedFacilities = selectedFacilities.includes(key)
      ? selectedFacilities.filter((item) => item !== key)
      : [...selectedFacilities, key];

    setSelectedFacilities(updatedFacilities);
    if (onChange) {
      onChange(updatedFacilities); 
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Fasilitas</h3>
      <div className="grid grid-cols-3 gap-4">
        {facilitiesData.map((facility) => (
          <div key={facility.key} className="flex items-center">
            <input
              type="checkbox"
              id={facility.key}
              checked={selectedFacilities.includes(facility.key)}
              onChange={() => handleFacilityChange(facility.key)}
              className="mr-2"
            />
            <label htmlFor={facility.key}>{facility.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSection;