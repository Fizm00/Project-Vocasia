import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewerCard = ({ name, rating, review }) => (
  <div className="bg-[#DADCC0] p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
    <div className="mb-4">
      <h3 className="text-base font-semibold text-[#193F3D]">{name}</h3>
      <div className="flex space-x-1 text-yellow-500">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    </div>
    <p className="text-[#193F3D] text-xs text-justify">{review}</p>
  </div>
);

const Reviewer = () => {
  const reviews = [
    {
      name: "Amaliyah Lee",
      rating: 4,
      review:
        "AnakKost itu solusi terbaik untuk anak muda yang cari kost! Pilihan tempatnya kece banget dan gampang banget nyarinya. Pasti balik lagi kalau butuh kost!",
    },
    {
      name: "Firza Smith",
      rating: 5,
      review:
        "Ini platform paling top buat cari kost dengan harga terjangkau tapi kualitasnya nggak main-main! Pelayanan pelanggan juga super responsif, bikin nyaman.",
    },
    {
      name: "Nazwa Ailee",
      rating: 4,
      review:
        "Pengalaman saya pakai AnakKost bener-bener memuaskan. Banyak pilihan kost, mudah dicari, dan saya langsung nemu tempat yang cocok. Pokoknya top banget!",
    },
    {
      name: "Nurdian Aditya",
      rating: 5,
      review:
        "AnakKost tuh platform yang bikin proses cari kost jadi cepet dan gampang. Pilihan kostnya banyak banget, dan support timnya super helpfull! Bener-bener recommended!",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-extrabold text-[#193F3D] text-center mb-8 transform transition-all duration-300 hover:scale-110 hover:translate-x-4">
        Kata Mereka tentang AnakKost
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review, index) => (
          <ReviewerCard
            key={index}
            name={review.name}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviewer;