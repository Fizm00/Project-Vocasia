import React from "react";
import { FaBed, FaBath, FaCar, FaWifi, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ResultCard = ({ kost }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(harga);
  };

  const handleTabLink = (event) => {
    event.preventDefault();
    window.oper("/property/" + kost._id, "blank", "noopener,noreferrer");
    // navigate(`/property/${kost._id}`, { state: { tab } });
  };

  const handleCardClick = () => {
    // Navigasi ke halaman detail kost
    // <Link to={`/property/${kost._id}`}>tes</Link>;
    <a href={`/property/${kost._id}`}></a>;
    // navigate(`/property/${kost?._id}`);
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:w-full items-start border rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Navigasi */}
      {/* <a
        href={`/property/${kost._id}`}
        onClick={handleTabLink}
        className="flex flex-col sm:flex-row w-full h-full"
      ></a> */}
      {/* Gambar */}
      <div className="w-full sm:w-1/3 h-40 sm:h-48">
        <a
          href={`/property/${kost._id}`}
          onClick={handleTabLink}
          className="flex flex-col sm:flex-row w-full h-full"
        >
          <img
            src={kost.images[0]}
            alt={kost.name || "Name Kost"}
            className="w-full h-full object-cover"
          />
        </a>
      </div>

      {/* Informasi Kost */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-2 text-sm mb-2">
            <span className="bg-white border font-bold px-2 py-1 rounded-md">
              {kost.property_type}
            </span>
            <span className="text-gray-400 font-semibold">
              Sisa {kost.stock} Kamar
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-800">{kost.name}</h3>
          <p className="text-sm text-gray-600">{kost.city}</p>
        </div>

        {/* Fasilitas */}
        <div className="flex items-center space-x-4 text-sm mt-3">
          {/* Tempat Tidur */}
          {kost.facilities?.jumlahKamar &&
            kost.spesifikasi.jumlahKamar !== 0 && (
              <div className="flex items-center space-x-1">
                <FaBed />
                <span>{kost.spesifikasi.jumlahKamar}</span>
              </div>
            )}

          {/* Kamar Mandi */}
          {kost.spesifikasi?.jumlahKamarMandi &&
            kost.spesifikasi.jumlahKamarMandi !== 0 && (
              <div className="flex items-center space-x-1">
                <FaBath />
                <span>{kost.spesifikasi.jumlahKamarMandi}</span>
              </div>
            )}

          {/* Parkir Motor*/}
          {kost.spesifikasi?.jumlahParkir &&
            kost.spesifikasi.jumlahParkir !== 0 && (
              <div className="flex items-center space-x-1">
                <FaCar />
                <span>{kost.spesifikasi.jumlahParkir}</span>
              </div>
            )}

          {/* Wifi */}
          {kost.spesifikasi?.termasukWifi &&
            kost.spesifikasi.termasukWifi !== false && (
              <div className="flex items-center space-x-1">
                <FaWifi />
                <span>{kost.spesifikasi.termasukWifi}</span>
              </div>
            )}
        </div>

        {/* Rating dan Harga */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-yellow-500 space-x-1">
            <FaStar />
            <span className="text-md font-bold text-black">
              {kost.averageRating}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">
              {formatHarga(kost.price)}
              <span className="text-gray-500 text-lg font-semibold">
                {/* /{kost.durasi} */}
                /Bulan
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
