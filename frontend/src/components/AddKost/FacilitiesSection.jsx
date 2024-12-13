import React, { useState } from "react";
import { FaBath, FaCar, FaWifi } from "react-icons/fa";
import { FaKitchenSet, FaPeopleRoof } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import { MdKitchen } from "react-icons/md";
import { BsFan } from "react-icons/bs";
import { IoBed, IoPerson } from "react-icons/io5";

const FacilitiesSection = ({ onChange }) => {
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const facilities = [
    { key: 'fullFurniture', icon: <IoBed />, label: 'Furniture Lengkap' },
          { key: 'kamarMandiDalam', icon: <FaBath />, label: 'Kamar Mandi Dalam' },
          { key: 'parkiran', icon: <FaCar />, label: 'Lahan Parkir' },
          { key: 'ac', icon: <TbAirConditioning />, label: 'AC' },
          { key: 'freeWifi', icon: <FaWifi />, label: 'Free Wifi' },
          { key: 'dapur', icon: <FaKitchenSet />, label: 'Dapur Umum' },
          { key: 'kulkas', icon: <MdKitchen />, label: 'Kulkas' },
          { key: 'kipasAngin', icon: <BsFan />, label: 'Kipas Angin' },
          { key: 'penjaga', icon: <IoPerson />, label: 'Penjaga' },
          { key: 'ruangTamu', icon: <FaPeopleRoof />, label: 'Ruang Tamu' },
        ];

  // Fungsi untuk menangani perubahan pilihan fasilitas
  const handleFacilityToggle = (key) => {
    setSelectedFacilities((prevSelected) => {
      if (prevSelected.includes(key)) {
        // Hapus fasilitas dari pilihan
        return prevSelected.filter(item => item !== key);
      } else {
        // Tambahkan fasilitas ke pilihan
        return [...prevSelected, key];
      }
    });
  };

  // Kirimkan data ke komponen induk jika onChange diberikan
  React.useEffect(() => {
    if (onChange) {
      onChange(selectedFacilities);
    }
  }, [selectedFacilities, onChange]);

  return (
    <div className="border p-10 mb-10 rounded-lg">
      <h2 className="text-lg font-bold text-center mb-6">Sertakan fasilitas yang ada di tempatmu!</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 h-auto gap-4">
        {facilities.map((fitur) => (
          <button
            key={fitur.key}
            onClick={() => handleFacilityToggle(fitur.key)}
            className={`flex flex-col items-center justify-center border rounded-lg p-4 gap-2 transition-colors duration-300 ${selectedFacilities.includes(fitur.key) ? 'bg-darkGreen text-white' : 'bg-gray-300 text-darkGreen'}`}
          >
            {React.cloneElement(fitur.icon, {
              className: "text-3xl `selectedFacilities.includes(fitur.key) ? 'text-white' : 'text-darkGreen'`,"
            })}
            <p className="text-center font-bold">{fitur.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSection;
