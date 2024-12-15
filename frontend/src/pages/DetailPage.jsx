import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DetailImage from "../components/DetailPage/DetailImage";
import Description from "../components/DetailPage/Description";
import MapSection from "../components/DetailPage/MapSection";
import RatingDetail from "../components/DetailPage/RatingDetail";
import BookingSection from "../components/DetailPage/BookingSection";
// import usePropertyStore from "../store/usePropertyStore";
import axiosInstance from "../config/axiosInstance";

const DetailPage = () => {
  const { id } = useParams(); // Ambil parameter id dari URL
  const navigate = useNavigate();
  // const { getProperty } = usePropertyStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/property/${id}`);
        setProperty(response.data);
        setLoading(false);
        console.log("Detail Page|response.data:", response.data);
        console.log("DataPhone:", response.data.data.user_id.phone);
      } catch (error) {
        console.error("Error fetching property:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id, navigate]);

  useEffect(() => {
    if (property) {
      setSelectedImage(property); // Ambil gambar pertama jika ada
    }
  }, [property]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-6">
        <div className="p-8 pt-4">
          {/* Gambar Kost */}
          <DetailImage images={property.data.images} openModal={openModal} />

          {/* Modal Gambar */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative w-full max-w-screen-sm mt-10 sm:w-3/4 md:w-3/4 lg:w-3/4 rounded-lg max-h-[80vh] overflow-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 p-2 text-white text-2xl font-bold hover:bg-gray-700"
                >
                  X
                </button>
                <img
                  src={property?.images?.[0] || null}
                  alt="Popup Gambar Kost"
                  className="w-full h-auto max-w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Section Detail */}
          <div className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-1 mt-12">
            <div className="h-full sm:w-2/3 p-1">
              <Description kostDetail={property} />
            </div>
            <div className="h-full sm:w-1/4 p-6 bg-white border rounded-lg shadow-lg">
              <BookingSection kostDetail={property} />
            </div>
          </div>

          {/* Maps Section */}
          <div className="mt-10">
            <MapSection kostDetail={property} />
          </div>

          {/* Rating Section */}
          <div className="mt-10">
            <RatingDetail kostDetail={property} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
