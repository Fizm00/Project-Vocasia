import React from 'react';
import { FaBed, FaBath, FaCar, FaWifi, FaStar } from 'react-icons/fa'; // Import ikon yang diperlukan
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

const ResultCard = ({ kost }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(harga);
  };

  const handleCardClick = () => {
    // Navigasi ke halaman detail kost
    navigate(`/detail/${kost?.id}`);
  };

  return (
    <div 
      className="flex flex-col sm:flex-row w-full sm:w-3/4 items-start border rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Gambar */}
      <div className="w-full sm:w-1/3 h-40 sm:h-48">
        <img 
          src={kost.image} 
          alt={kost.namaKost || 'Gambar Kost'} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Informasi Kost */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-2 text-sm mb-2">
            <span className="bg-white border font-bold px-2 py-1 rounded-md">{kost.tipeKost}</span>
            <span className="text-gray-400 font-semibold">Sisa {kost.ketersediaan} Kamar</span>
          </div>
          <h3 className="font-bold text-lg text-gray-800">{kost.namaKost}</h3>
          <p className="text-sm text-gray-600">{kost.lokasi}</p>
        </div>

        {/* Fasilitas */}
        <div className="flex items-center space-x-4 text-sm mt-3">
          {/* Tempat Tidur */}
          {kost.fasilitas?.tempatTidur && kost.fasilitas.tempatTidur !== 0 && (
            <div className="flex items-center space-x-1">
              <FaBed />
              <span>{kost.fasilitas.tempatTidur}</span>
            </div>
          )}

          {/* Kamar Mandi */}
          {kost.fasilitas?.kamarMandi && kost.fasilitas.kamarMandi !== 0 && (
            <div className="flex items-center space-x-1">
              <FaBath />
              <span>{kost.fasilitas.kamarMandi}</span>
            </div>
          )}

          {/* Parkir */}
          {kost.fasilitas?.parkir && kost.fasilitas.parkir !== 0 && (
            <div className="flex items-center space-x-1">
              <FaCar />
              <span>{kost.fasilitas.parkir}</span>
            </div>
          )}

          {/* Wifi */}
          {kost.fasilitas?.wifi && kost.fasilitas.wifi !== 0 && (
            <div className="flex items-center space-x-1">
              <FaWifi />
              <span>{kost.fasilitas.wifi}</span>
            </div>
          )}
        </div>

        {/* Rating dan Harga */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-yellow-500 space-x-1">
            <FaStar />
            <span className="text-md font-bold text-black">{kost.rating}</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">
              {formatHarga(kost.harga)}/{kost.durasi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
