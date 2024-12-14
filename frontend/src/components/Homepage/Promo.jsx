import axios from "axios";
// import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import { AiOutlineCar } from "react-icons/ai";
import { FaBed, FaPaw, FaShower } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Promo = () => {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:3000/api/v1";

  useEffect(() => {
    const fetchedProperty = async () => {
      try {
        const response = await axios.get(apiUrl + "/properties");

        setKosts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchedProperty();
  }, []);

  // useEffect(() => {
  //   const fetchedData = [
  //     {
  //       id: 1,
  //       name: "Kost Trinanda",
  //       location: "Jakarta Selatan, Jalan Jagakarsa No. 1",
  //       type: "Putri",
  //       image: "/1-kostImage.png",
  //       price: "Rp 1.500.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 1 },
  //         { icon: <AiOutlineCar />, count: 1 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 1 },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "Kost Sultan Kencana",
  //       location: "Surabaya Timur, Jalan Garuda No. 2",
  //       type: "Putra",
  //       image: "/2-kostImage.png",
  //       price: "Rp 1.200.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 2 },
  //         { icon: <AiOutlineCar />, count: 1 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 1 },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: "Kost Rahayu",
  //       location: "Bali, Jalan Ubud Permai No. 3",
  //       type: "Campur",
  //       image: "/3-kostImage.png",
  //       price: "Rp 2.000.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 3 },
  //         { icon: <AiOutlineCar />, count: 2 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 2 },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: "Kost Keraton",
  //       location: "Yogyakarta, Jalan Kaliurang No. 4",
  //       type: "Putra",
  //       image: "/4-kostImage.png",
  //       price: "Rp 1.000.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 1 },
  //         { icon: <AiOutlineCar />, count: 1 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 1 },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       name: "Kost Harmoni",
  //       location: "Karawang, Jalan Telukjambe Timur No. 5",
  //       type: "Putri",
  //       image: "/5-kostImage.png",
  //       price: "Rp 1.800.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 2 },
  //         { icon: <AiOutlineCar />, count: 1 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 1 },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       name: "Kost Eden",
  //       location: "Depok, Jalan Kebon Jeruk No. 6",
  //       type: "Campur",
  //       image: "/6-kostImage.png",
  //       price: "Rp 1.700.000 / bulan",
  //       icons: [
  //         { icon: <FaBed />, count: 1 },
  //         { icon: <AiOutlineCar />, count: 2 },
  //         { icon: <FaShower />, count: 1 },
  //         { icon: <FaPaw />, count: 2 },
  //       ],
  //     },
  //   ];
  //   setKosts(fetchedData);
  // }, []);

  const handleCardClick = (kostId) => {
    navigate(`property/${kostId}`);
  };

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
                src={"/uploads/" + kost.images[0]}
                alt={kost.name}
                className="h-40 w-full object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">{kost.price}</span>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-[#DADCC0] text-[#193F3D]">
                  {kost.property_type}
                </button>
              </div>
              <h3 className="text-base font-extrabold text-[#193F3D] mb-1">
                {kost.name}
              </h3>
              <p className="text-xs text-[#193F3D] mb-3">
                {kost.city},{kost.address}
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
