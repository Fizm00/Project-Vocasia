import React from "react";
import { FaBed, FaBath, FaCar, FaWifi, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

const PropertyCard = ({ property, onClick }) => {
  const formatHarga = (harga) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(harga);

  return (
    <div
      className="flex flex-col sm:flex-row w-full sm:w-3/4 items-start border rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      {/* Gambar */}
      <div className="w-full sm:w-1/3 h-40 sm:h-48">
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Informasi */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm mb-2">
            <span className="bg-white border font-bold px-2 py-1 rounded-md">
              {property.tipeproperty}
            </span>
            <span className="text-gray-400 font-semibold">
              Sisa {property.ketersediaan} Kamar
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-800">{property.name}</h3>
          <p className="text-sm text-gray-600">{property.city}</p>
        </div>

        {/* Fasilitas */}
        <div className="flex items-center space-x-4 text-sm mt-3">
          {property.facility.includes("bed") && (
            <div className="flex items-center space-x-1">
              <FaBed />
              <span>Tempat Tidur</span>
            </div>
          )}
          {property.facility.includes("bathroom") && (
            <div className="flex items-center space-x-1">
              <FaBath />
              <span>Kamar Mandi</span>
            </div>
          )}
          {property.facility.includes("parking") && (
            <div className="flex items-center space-x-1">
              <FaCar />
              <span>Parkir</span>
            </div>
          )}
          {property.facility.includes("wifi") && (
            <div className="flex items-center space-x-1">
              <FaWifi />
              <span>WiFi</span>
            </div>
          )}
        </div>

        {/* Rating dan Harga */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-yellow-500 space-x-1">
            <FaStar />
            <span className="text-md font-bold text-black">
              {property.rating}
            </span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">
              {formatHarga(property.price)}/bulan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultCard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        if (Array.isArray(response.data.data)) {
          setProperties(response.data.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          onClick={() => navigate(`/detail/${property._id}`)}
        />
      ))}
    </div>
  );
};

export default { PropertyCard, ResultCard };
