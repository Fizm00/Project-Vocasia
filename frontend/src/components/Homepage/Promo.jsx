import React, { useState, useEffect } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { FaBed, FaPaw, FaShower } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import usePropertyStore from "../../store/usePropertyStore";
import axiosInstance from "../../config/axiosInstance";

const Promo = () => {
  const { getProperty } = usePropertyStore();
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedProperty = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        // const response = await getProperty();

        setKosts(response.data.data);
        setLoading(false);
        console.log("Response Data properti:", response.data);
      } catch (error) {
        setError("Promo | setError:" + error.message);

        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchedProperty();
  }, [getProperty]);

  const handleCardClick = (kostId) => {
   // window.open(`/property/${kostId}`, "_blank", "noopener,noreferrer");
 // };

  // const URI_DOMAIN = import.meta.env.VITE_URI_DOMAIN;
    navigate(`detail/${kostId}`);
  };

  const URI_DOMAIN = "https://api-anakkost.vocasia-fsjs-c.fun/api/v1";

  // Render UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-[#193F3D] mb-6 text-left transition-all duration-300 hover:translate-x-3">
          Promo Kilat Kost di{" "}
          <span className="text-[#78825B]">Semua Kota!</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {kosts.map((kost) => (
            <div
              key={kost._id}
              className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 group cursor-pointer"
              onClick={() => handleCardClick(kost._id)}
            >
              <img
                src={kost.images[0]}
                alt={kost.name}
                className="h-40 w-full object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-darkGreen">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(kost.price)}
                <span className="text-gray-500 text-sm md:text-md font-semibold">
                  {/* /{kostDetail.durasi} */}
                  /Hari
                </span>
              </p>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-[#DADCC0] text-[#193F3D]">
                  {kost.gender_type}
                </button>
              </div>
              <h3 className="text-base font-extrabold text-[#193F3D] mb-1">
                {kost.name}
              </h3>
              <p className="text-xs text-[#193F3D] mb-3">
                {kost.city}, {kost.address}
              </p>
              <div className="flex items-center gap-4 text-[#193F3D] text-sm">
                {/* {kost.icons.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span>{item.icon}</span>
                    <span>{item.count}</span>
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promo;