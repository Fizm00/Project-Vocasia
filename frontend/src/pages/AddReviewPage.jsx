import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { postReview } from "../api/review";
import { getPropertyById } from "../api/property";
import { getBookingById } from "../api/booking";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rentalDetails, setRentalDetails] = useState(null);
  const [ property, setProperty ] = useState(null);

  // const booking_id = localStorage.getItem("booking_id");
  const token = localStorage.getItem("token");
  const booking_id = '67617c8d24caa404d33e627a';
  
  useEffect(() => {
    const fetchRentalDetails = async () => {
      const response = await getBookingById(booking_id);
      setRentalDetails(response.data.data);
    }
    fetchRentalDetails();
  }, [booking_id]);

useEffect(() => {
  async function fetchPropertyDetails() {
    try {
      const propertyId = rentalDetails?.property_id; 
      const data = await getPropertyById(propertyId);
      setProperty(data.data.data); 
    } catch (err) {
      console.error("Error fetching rental details:", err);
    }
  }
  fetchPropertyDetails();
}, [booking_id]);

console.log(rentalDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingClick = (index) => {
    setRating(index);
  };
  console.log(rating, comment);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      alert("Mohon beri rating dan komentar!");
      return;
    }

    const reviewData = {
      user_id: rentalDetails?.user_id, 
      property_id: rentalDetails?.property_id,
      booking_id: booking_id, 
      rating: rating.toString(), 
      comment,
    };
    console.log(reviewData)
    console.log(token)
    setLoading(true);
    setError(null);

    try {
      const response = await postReview(reviewData, token);
      console.log("Review berhasil dikirim:", response);
      setSubmitted(true);
      alert("Review berhasil ditambahkan!");
    } catch (err) {
      console.error("Error saat mengirim review:", err);
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full md:w-3/4 lg:w-2/3 bg-white rounded-lg border border-5 border-gray-200 p-8 mb-10">
          <h1 className="text-left text-md md:text-xl font-bold text-gray-800 mb-4">
            Yuk kasih review kost yang kamu sewa!
          </h1>
          {rentalDetails ? (
            <div className="flex flex-col md:flex-row rental-details mt-2 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/3">
                <img
                  src={property?.images[0]}
                  alt="Kost"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3 md:pl-6">
                <p className="mt-2 text-center text-sm py-1 px-1 border border-gray-300 font-semibold rounded-lg w-full md:w-2/3">
                  {formatDate(rentalDetails?.start_date)} -{" "}
                  {formatDate(rentalDetails?.end_date)}
                </p>
                <p className="mt-3 text-xl font-bold">{property?.name}</p>
                <p className="text-gray-600">{property?.address}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading rental details...</p>
          )}

          <hr className="my-4 border border-3" />

          {/* Rating Section */}
          <div className="rating">
            <p className="text-lg text-center font-bold text-gray-800">
              Seberapa puas kamu dengan kost ini?
            </p>
            <div className="stars flex justify-center gap-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <IoStar
                  key={index}
                  size={32}
                  color={index < rating ? "#FFD700" : "#e4e5e9"}
                  onClick={() => handleRatingClick(index + 1)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment mt-4">
            <label htmlFor="comment" className="block text-lg font-semibold">
              Tulis review kamu lebih lanjut:
            </label>
            <p className="text-sm">
              Review yang lengkap akan membantu pencari kost yang lain
              menemukan kost yang tepat!
            </p>
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
              disabled={loading}
              className="bg-darkGreen font-semibold text-white w-full py-2 rounded-lg hover:bg-white hover:text-darkGreen border border-darkGreen"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>

          {submitted && (
            <div className="mt-4 text-center text-green-500">
              <p>Terima kasih sudah memberikan review!</p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddReview;