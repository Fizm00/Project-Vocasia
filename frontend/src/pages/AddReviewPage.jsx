import React, { useState } from 'react';
import { IoStar } from "react-icons/io5";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const rentalDetails = {
    image: 'https://i.pinimg.com/736x/3c/32/cd/3c32cdbe6323e085400f43447133169d.jpg',
    startDate: '2023-08-01',
    endDate: '2023-09-01',
    name: 'Kost Trinanda',
    location: 'Jl. Kostan No. 10, Jakarta',
  };

  // Fungsi untuk mengubah format tanggal menjadi tanggal, bulan, tahun
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options); 
  };

  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  
  const handleRatingClick = (index) => {
    setRating(index);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert('Mohon beri rating dan komentar!');
      return;
    }

    setSubmitted(true);
    alert('Review berhasil ditambahkan!');
    console.log({ rating, comment });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-3/4 lg:w-2/3 bg-white rounded-lg border border-5 border-gray-200 p-8 mb-10">
          <h1 className="text-left text-md md:text-xl font-bold text-gray-800 mb-4">Yuk kasih review kost yang kamu sewa!</h1>
          {/* Display Kost */}
          <div className="flex flex-col md:flex-row rental-details mt-2 space-y-4 md:space-y-0">
            <div className='w-full md:w-1/3'>
              <img src={rentalDetails.image} alt="Kost" className="w-full h-48 object-cover rounded-lg" />
            </div>
            <div className='w-full md:w-2/3 md:pl-6'>
              <p className="mt-2 text-center text-sm py-1 px-1 border border-gray-300 font-semibold rounded-lg w-full md:w-2/3">
                {formatDate(rentalDetails.startDate)} - {formatDate(rentalDetails.endDate)}
              </p>
              <p className="mt-3 text-xl font-bold">{rentalDetails.name}</p>
              <p className="text-gray-600">{rentalDetails.location}</p>
            </div>
          </div>

          <hr className="my-4 border border-3" />

          {/* Rating Section */}
          <div className="rating">
            <p className="text-lg text-center font-bold text-gray-800">Seberapa puas kamu dengan kost ini?</p>
            <div className="stars flex justify-center gap-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <IoStar
                  key={index}
                  size={32}
                  color={index < rating ? '#FFD700' : '#e4e5e9'}
                  onClick={() => handleRatingClick(index + 1)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment mt-4">
            <label htmlFor="comment" className="block text-lg font-semibold">Tulis review kamu lebih lanjut:</label>
            <p className="text-sm">Review yang lengkap akan membantu pencari kost yang lain menemukan kost yang tepat!</p>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Masukkan komentar kamu..."
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-darkGreen"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="submit-button mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-darkGreen font-semibold text-white w-full py-2 rounded-lg hover:bg-white hover:text-darkGreen border border-darkGreen"
            >
              Kirim
            </button>
          </div>

          {submitted && (
            <div className="mt-4 text-center text-green-500">
              <p>Terima kasih sudah memberikan review!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddReview;
