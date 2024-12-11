import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star } from 'react-feather';
import Layout from "../components/Layout";

const reviews = [
  {
    id: 1,
    name: "Rani Septiana",
    rating: 5,
    comment: "Kos ini sangat nyaman untuk ditinggali. Fasilitasnya lengkap, lingkungan aman, dan pemiliknya ramah. Recommended banget!! Dekat dengan kampus, minimarket, dan halte bus. Kamar luas dan sesuai dengan foto. Worth every penny!",
    date: "2024-01-10"
  },
  {
    id: 2,
    name: "Ahmad Rizki",
    rating: 4,
    comment: "Lokasi strategis, dekat dengan pusat kota. Fasilitas cukup lengkap, tapi AC kadang kurang dingin. Overall recommended untuk mahasiswa.",
    date: "2024-01-09"
  },
  {
    id: 3,
    name: "Sarah Putri",
    rating: 5,
    comment: "Perfect banget buat anak kuliah! WiFi kenceng, area parkir luas, dan keamanan 24 jam. Pemilik kos sangat responsif terhadap keluhan.",
    date: "2024-01-08"
  },
  {
    id: 4,
    name: "Budi Santoso",
    rating: 5,
    comment: "Lingkungan sangat bersih dan tertata rapi. Tetangga kos ramah-ramah, ada ruang komunal yang nyaman untuk kerja atau ngobrol. Sangat worth it dengan harganya!",
    date: "2024-01-07"
  },
  {
    id: 5,
    name: "Linda Wijaya",
    rating: 4,
    comment: "Kamar cukup luas dan bersih. Lokasi strategis dekat dengan transportasi umum. Satu-satunya kekurangan mungkin parkiran yang agak sempit.",
    date: "2024-01-06"
  },
  {
    id: 6,
    name: "Dimas Prayoga",
    rating: 5,
    comment: "Pelayanan super responsif, fasilitas lengkap, dan lingkungan aman. Cocok untuk mahasiswa atau pekerja. Bonus: ada taman kecil yang asri untuk tempat bersantai.",
    date: "2024-01-05"
  }
];

export default function Review() {
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Ulasan Kos Saya</h1>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow">
              <button
                onClick={() => toggleReview(review.id)}
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                {expandedReviews[review.id] ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </button>

              {expandedReviews[review.id] && (
                <div className="p-4 border-t">
                  <p className="mb-4 text-gray-600">{review.comment}</p>
                  <div className="mt-4">
                    <h4 className="mb-2 font-medium">Balas Ulasan</h4>
                    <textarea
                      placeholder="Berikan balasan kepada penyewa yang sudah mengulas"
                      className="w-full p-3 mb-2 border border-gray-200 rounded-md"
                      rows="3"
                    />
                    <button className="px-4 py-2 text-white rounded-md bg-darkGreen hover:opacity-90">
                      Kirim Balasan
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

