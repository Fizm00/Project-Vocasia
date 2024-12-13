import React, { useState } from "react";
import { IoBedOutline, IoCarOutline, IoWifiOutline } from "react-icons/io5";
import { BiBath } from "react-icons/bi";

const HighlightFeatures = ({ onChange }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const features = [
    { icon: <IoBedOutline className="text-3xl ${selectedFeatures.includes(fitur.fasilitas) ?  'text-white' : text-darkGreen'}" />, fasilitas: "Full Furniture" },
    { icon: <BiBath className="text-3xl ${selectedFeatures.includes(fitur.fasilitas) ?  'text-white' : text-darkGreen'" />, fasilitas: "Kamar Mandi Dalam" },
    { icon: <IoCarOutline className="text-3xl ${selectedFeatures.includes(fitur.fasilitas) ?  'text-white' : text-darkGreen'" />, fasilitas: "Parkiran" },
    { icon: <IoWifiOutline className="text-3xl ${selectedFeatures.includes(fitur.fasilitas) ?  'text-white' : text-darkGreen'" />, fasilitas: "Free Wifi" },
  ];

  // Fungsi untuk menangani pemilihan fitur
  const handleFeatureToggle = (fasilitas) => {
    setSelectedFeatures((prevFeatures) => {
      if (prevFeatures.includes(fasilitas)) {
        // Jika fitur sudah dipilih, hapus dari daftar
        return prevFeatures.filter((feature) => feature !== fasilitas);
      } else {
        // Jika fitur belum dipilih, tambahkan ke daftar
        return [...prevFeatures, fasilitas];
      }
    });
  };

  const handleOnChange = () => {
    onChange(selectedFeatures);
  };

  return (
    <div className="h-full mb-6 p-6 border rounded-lg">
      <h2 className="text-lg text-center font-bold">Beritahu kami fitur apa yang jadi unggulan tempatmu!</h2>
      <p className="text-sm text-gray-400 text-center mb-6">Berikut merupakan beberapa fasilitas yang dapat menjadi sorotan di tempatmu!</p>
      <div className="grid grid-cols-2 gap-4 py-4 px-4 md:grid-cols-4 md:px-14">
        {features.map((fitur) => (
          <button
            key={fitur.fasilitas}
            className={`flex flex-col items-center justify-center border rounded-lg p-4 gap-2 ${selectedFeatures.includes(fitur.fasilitas) ? 'bg-darkGreen text-white' : 'bg-gray-300 text-darkGreen'}`}
            onClick={() => {
              handleFeatureToggle(fitur.fasilitas);
              handleOnChange();
            }}
          >
            {fitur.icon}
            <p className="text-center font-bold">{fitur.fasilitas}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HighlightFeatures;
