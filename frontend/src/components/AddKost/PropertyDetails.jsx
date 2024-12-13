import React, { useState } from "react";
import { IoMan, IoWoman } from "react-icons/io5";
import { ImManWoman } from "react-icons/im";

const PropertyDetails = ({ onChange }) => {
  const [namaTempat, setNamaTempat] = useState("");
  const [alamatTempat, setAlamatTempat] = useState("");
  const [tipePenyewa, setTipePenyewa] = useState("");

  const handleInputChange = (field, value) => {
    if (field === "namaTempat") setNamaTempat(value);
    if (field === "alamatTempat") setAlamatTempat(value);
    if (field === "tipePenyewa") setTipePenyewa(value);
    
    onChange({
      namaTempat,
      alamatTempat,
      tipePenyewa,
    });
  };

  return (
    <div className="border p-6 md:p-10 mb-10 rounded-lg">
      {/* Nama dan Alamat */}
      <div className="mb-2">
        <h2 className="text-lg font-bold">Berikan nama dan alamat tempat yang ingin kamu sewakan</h2>
        <p className="text-sm text-gray-400 mb-4">
          Usahakan nama dan alamat tempat sesuai dengan maps ya! Biar pelanggan lebih mudah menemukan tempatmu.
        </p>
        <div className="p-2">
          <div className="flex flex-wrap md:flex-nowrap items-center mb-4">
            <p className="w-full md:w-1/5 text-center md:text-left h-10 p-2 font-semibold">Nama Tempat</p>
            <input
              type="text"
              placeholder="Masukkan nama tempat"
              className="w-full md:w-4/5 border rounded-md p-2"
              value= {namaTempat}
              onChange={(e) => handleInputChange("namaTempat", e.target.value)}
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center">
            <p className="w-full md:w-1/5 text-center md:text-left h-10 p-2 font-semibold">Alamat Tempat</p>
            <input
              type="text"
              placeholder="Masukkan alamat tempat"
              className="w-full md:w-4/5 border rounded-md p-2"
              value={alamatTempat}
              onChange={(e) => handleInputChange("alamatTempat", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tipe Penyewa */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Sertakan juga tipe penyewa yang kamu terima</h2>
        <p className="text-sm text-gray-400">Beri tahu tipe penyewa apa yang ingin kamu terima di tempatmu?</p>
        <div className="flex flex-wrap px-4 py-8 space-y-4 md:space-y-0 md:px-14 md:justify-center">
          <button
            className={`border border-darkGreen px-10 rounded w-full md:w-1/4 h-32 text-center font-bold mr-1 ${tipePenyewa === "Putri" ? "bg-darkGreen text-white" : "bg-gray-200 text-darkGreen"}`}
            onClick={() => handleInputChange("tipePenyewa", "Putri")}
          >
            <IoWoman className="w-full h-10" />
            <span className="block mt-2">Putri</span>
          </button>
          <button
            className={`border border-darkGreen px-10 rounded w-full md:w-1/4 h-32 text-center font-bold mr-1 ${tipePenyewa === "Pria" ? "bg-darkGreen text-white" : "bg-gray-200 text-darkGreen"}`}
            onClick={() => handleInputChange("tipePenyewa", "Pria")}
          >
            <IoMan className="w-full h-10" />
            <span className="block mt-2">Pria</span>
          </button>
          <button
            className={`border border-darkGreen px-10 rounded w-full md:w-1/4 h-32 text-center font-bold ${tipePenyewa === "Campuran" ? "bg-darkGreen text-white" : "bg-gray-200 text-darkGreen"}`}
            onClick={() => handleInputChange("tipePenyewa", "Campuran")}
          >
            <ImManWoman className="w-full h-10" />
            <span className="block mt-2">Campuran</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
