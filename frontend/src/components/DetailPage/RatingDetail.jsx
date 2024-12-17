import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-400" />);
    }
  }
  return stars;
};

const RatingDetail = ({ kostDetail }) => {
  // const averageRating = kostDetail.averageRating;
  // const [showAllReviews, setShowAllReviews] = useState(false);

  // Menampilkan review terbatas atau semua review
  // const reviewsToShow = showAllReviews
  //   ? kostDetail.reviews
  //   : kostDetail.reviews.slice(0, 8);

  return (
    <div className="mt-10 sm:ml-0 lg:ml-20">
      <p className="text-2xl font-bold mb-2">Reviews Kost</p>

      {/* Menampilkan rating */}
      <div className="flex items-center text-2xl mb-8">
        <div className="flex mr-4">
          {/* {renderStars(Math.round(averageRating))}{" "} */}
          {/* Menampilkan bintang penuh sesuai averageRating */}
        </div>
        <span className="text-xl font-bold text-gray-700">
          {/* {averageRating}/5 */}
        </span>
      </div>

      {/* Menampilkan list review */}
      <div>
        {kostDetail.reviews && kostDetail.reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {reviewsToShow.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  {/* Foto dan Nama Pengguna */}
                  <div className="flex items-center mb-2">
                    <img
                      src={review.user.photo}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-700">
                        {review.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Rating Bintang */}
                  <div className="flex mb-2">{renderStars(review.rating)}</div>

                  {/* Komentar */}
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Tombol untuk menampilkan semua review */}
            <div className="text-center">
              {kostDetail.reviews.length > 8 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-4 text-darkGreen underline text-md hover:text-green-500"
                >
                  {showAllReviews
                    ? "Sembunyikan Review"
                    : "Tampilkan Semua Review"}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Belum ada ulasan untuk kost ini.</p>
        )}
      </div>
    </div>
  );
};

export default RatingDetail;
