import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import kost from '../data/kostData';
import DetailImage from '../components/DetailPage/DetailImage'; 
import Description from '../components/DetailPage/Description'; 
import MapSection from '../components/DetailPage/MapSection';
import RatingDetail from '../components/DetailPage/RatingDetail';
import BookingSection from '../components/DetailPage/BookingSection'

const DetailPage = () => {
  const { id } = useParams();  
  const [kostDetail, setKostDetail] = useState(null); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundKost = kost.find((kost) => kost.id === parseInt(id));
    if (foundKost) {
      setKostDetail(foundKost);
      setSelectedImage(foundKost.images[0]); 
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!kostDetail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-10 m-4">
        {/* Detail Kost */}
        <div className="p-6">
          {/* Gambar Kost */}
          <DetailImage
            images={kostDetail.images} 
            openModal={openModal} 
          />

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
                  src={selectedImage}
                  alt="Popup Gambar Kost"
                  className="w-full h-auto max-w-full object-contain"
                />
              </div>
            </div>
          )}


          {/* Section Detail */}
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-1 mt-12">
            {/* Deskripsi Kost */}
            <div className="h-full sm:w-2/3 p-1">
              <Description kostDetail={kostDetail} />
            </div>
            {/* Booking Kost */}
            <div className="h-full sm:w-1/3 p-6 bg-white border rounded-lg shadow-lg">
              <BookingSection kostDetail={kostDetail} />
            </div>  
          </div>

          {/* Maps Section */}
          <div className="mt-10">
            <MapSection kostDetail={kostDetail} />
          </div>

          {/* Rating Section */}
          <div className="mt-10">
            <RatingDetail kostDetail={kostDetail} />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
