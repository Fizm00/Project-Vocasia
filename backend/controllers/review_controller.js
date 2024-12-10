const Review = require("../models/Review");
const Booking = require("../models/Booking");

const addReview = async (user_id, property_id, booking_id, rating, comment) => {
  try {
    const booking = await Booking.findOne({
      _id: booking_id,
      user_id,
      property_id,
      status: "pending",
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    const existingReview = await Review.findOne({
      user_id,
      property_id,
      booking_id,
    });

    if (existingReview) {
      throw new Error("Review already exists");
    }

    // save review
    const newReview = new Review({
      user_id,
      property_id,
      booking_id,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
  } catch (error) {
    throw error;
  }
};

const createReview = async (req, res) => {
  const { user_id, property_id, booking_id, rating, comment } = req.body;
  try {
    const newReview = await addReview(
      user_id,
      property_id,
      booking_id,
      rating,
      comment
    );

    res.status(201).json({
      status: "success | OK",
      message: "Review Created Successfully",
      success: true,
      data: newReview,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed | createReview",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// const getReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ property_id: req.params.id })
//       .populate("user_id", "name")
//       .sort({ createdAt: -1 });
//     //   .skip((page - 1) * limit);

//     if (!reviews.length) {
//       return res.status(404).json({ message: "No reviews found" });
//     }

//     const averageRating =
//       reviews.reduce((total, review) => total + review.rating, 0) /
//       reviews.length;

//     await Property.findOneAndUpdate(req.params.id, {
//       average_rating: averageRating,
//     });
//     const resultAverageRating = {
//       averageRating: averageRating,
//       totalReviews: reviews.length,
//       reviews: reviews,
//     };
//     res.status(200).json({
//       status: "success | OK",
//       message: "List Of Reviews",
//       success: true,
//       data: reviews + resultAverageRating,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: error.message,
//       success: false,
//       data: null,
//     });
//   }
// };

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user_id", "name")
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({
      status: "success | OK",
      message: "List Of Reviews",
      success: true,
      data: reviews,
    });
  } catch {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = { addReview, createReview, getReviews };
