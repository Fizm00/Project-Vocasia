import React from 'react';
import { FaMapMarkerAlt, FaBath, FaWifi, FaCar } from 'react-icons/fa';
import { MdKitchen, MdOutlinePower } from "react-icons/md";
import { FaKitchenSet, FaPeopleRoof } from "react-icons/fa6";
import { IoBedOutline, IoBed, IoCarOutline, IoWifiOutline, IoPerson, IoWater } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { BsFan } from "react-icons/bs";

const Description = ({ kostDetail }) => {
  const spesifikasi = [
    { key: 'termasukListrik', icon: <MdOutlinePower className="text-gray-500 mr-4" />, label: 'Temasuk Listrik' },
    { key: 'termasukAir', icon: <IoWater className="text-gray-500 mr-4" />, label: 'Temasuk Air' },
  ]

  const fasilitas = [
    { key: 'fullFurniture', icon: <IoBed className="text-gray-500 mr-4" />, label: 'Furniture Lengkap' },
    { key: 'kamarMandiDalam', icon: <FaBath className="text-gray-500 mr-4" />, label: 'Kamar Mandi Dalam' },
    { key: 'parkiran', icon: <FaCar className="text-gray-500 mr-4" />, label: 'Lahan Parkir' },
    { key: 'ac', icon: <TbAirConditioning className="text-gray-500 mr-4" />, label: 'AC' },
    { key: 'freeWifi', icon: <FaWifi className="text-gray-500 mr-4" />, label: 'Free Wifi' },
    { key: 'dapur', icon: <FaKitchenSet className="text-gray-500 mr-4" />, label: 'Dapur Umum' },
    { key: 'kulkas', icon: <MdKitchen className="text-gray-500 mr-4" />, label: 'Kulkas' },
    { key: 'kipasAngin', icon: <BsFan className="text-gray-500 mr-4" />, label: 'Kipas Angin' },
    { key: 'penjaga', icon: <IoPerson className="text-gray-500 mr-4" />, label: 'Penjaga' },
    { key: 'ruangTamu', icon: <FaPeopleRoof className="text-gray-500 mr-4" />, label: 'Ruang Tamu' },
  ];

  return (
    <div className="px-4 sm:px-2 lg:px-20">
      <h1 className="text-4xl font-bold mb-4">{kostDetail.namaKost}</h1>
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 text-sm mr-2" />
          <p className="text-gray-400 text-sm">{kostDetail.lokasi}</p>
        </div>
        <div className="flex items-center">
          <IoBedOutline className="text-red-500 text-sm mr-2" />
          <p className="text-red-500 text-sm">{kostDetail.ketersediaan} kamar tersedia</p>
        </div>
      </div>

      {/* Fasilitas Kost: Kotak persegi dengan icon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {kostDetail.fasilitas.fullFurniture && (
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-4 gap-2">
            <IoBedOutline className="text-3xl text-darkGreen" />
            <p className="text-center text-darkGreen font-bold">Furniture Lengkap</p>
          </div>
        )}
        {kostDetail.fasilitas.kamarMandiDalam && (
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-2 gap-2">
            <BiBath className="text-3xl text-darkGreen" />
            <p className="text-center text-darkGreen font-bold">Kamar Mandi Dalam</p>
          </div>
        )}
        {kostDetail.fasilitas.parkiran && (
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-4 gap-2">
            <IoCarOutline className="text-3xl text-darkGreen" />
            <p className="text-center text-darkGreen font-bold">Lahan Parkir</p>
          </div>
        )}
        {kostDetail.fasilitas.freeWifi && (
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-lg p-4 gap-2">
            <IoWifiOutline className="text-3xl text-darkGreen" />
            <p className="text-center text-darkGreen font-bold">Wifi</p>
          </div>
        )}
      </div>

      {/* Info User yang Upload */}
      <div className="flex items-center space-x-4 mt-10 mb-10">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img 
            src={kostDetail.user.photo} 
            alt="Pemilik Kost" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <p className="text-gray-700 text-sm">Pemilik Kost:</p>
          <p className="text-gray-700 text-xl font-bold">{kostDetail.user.name}</p>
        </div>  
      </div>

      {/* Deskripsi Kost */}
      <div className="w-full">
        <p className="font-bold text-2xl mb-4">Deskripsi Kost</p>
        <p className="text-gray-500">{kostDetail.deskripsi}</p>
      </div>

      {/* Spesifikasi Kost */}
      <div className="space-y-4">
        <p className="font-bold text-2xl mt-10 mb-4">Spesifikasi Kost</p>
        {spesifikasi.map((item) => {
          const value = kostDetail.spesifikasi[item.key];

          return (
            value && (
              <div key={item.key} className="flex items-center">
                {item.icon}
                <p>{item.label}</p>
              </div>
            )
          );
        })}
      </div>


      {/* Fasilitas Kost */}
      <div className="w-full">
        <p className="font-bold text-2xl mt-10 mb-4">Fasilitas Kost</p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {fasilitas.map(({ key, icon, label }) =>
            kostDetail.fasilitas[key] && (
              <div key={key} className="flex items-center">
                {icon}
                <p>{label}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
