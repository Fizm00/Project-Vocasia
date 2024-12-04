import React from 'react';

const Card = () => {
  const kosts = [
    {
      id: 1,
      name: "Terdekat",
      description: "Kost terbaik yang dekat dengan aktivitasmu, karena waktu itu berharga!",
      image: "/1-kostImage.png",
    },
    {
      id: 2,
      name: "Aman",
      description: "Pilihan kost yang aman dengan harga ramah, cocok untuk semua lokasi!",
      image: "/2-kostImage.png",
    },
    {
      id: 3,
      name: "Nyaman",
      description: "Rasakan kenyamanan kost eksklusif dengan fasilitas yang membuatmu betah.",
      image: "/3-kostImage.png",
    },
    {
      id: 4,
      name: "Pas di Kantong",
      description: "Kost berkualitas dengan harga pas, nyaman dan ramah untuk kantongmu.",
      image: "/4-kostImage.png",
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-[#193F3D] mb-6 text-left">
          Temukan Kost Terbaik <span className="text-[#78825B]">Impianmu!</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kosts.map(kost => (
            <div
              key={kost.id}
              className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out group hover:scale-105 hover:shadow-xl"
            >
              <img
                src={kost.image}
                alt={kost.name}
                className="h-40 w-full object-cover rounded-lg mb-2 transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <h3 className="text-base font-extrabold text-[#193F3D] mb-3">{kost.name}</h3>
              <p className="text-sm text-[#193F3D] mb-2">{kost.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;