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
      data: { user_id, property_id, booking_id, rating, comment },
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

const updateReviewsById = async (req, res) => {
  const reviews = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  try {
    res.status(200).json({
      status: "success | OK",
      message: "Review Updated Successfully",
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

//get all reviews by Property ID
const getReviewsByPropertyId = async (req, res) => {
  try {
    const property_id = req.params.id;
    const reviews = await Review.aggregate([
      {
        $match: { property_id: property_id },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "user_id",
          foreignField: "user_id",
          as: "userBookings",
        },
      },
      {
        $match: {
          "userBookings.property_id": property_id,
        },
      },
      {
        $project: {
          userBookings: 0,
        },
      },
    ]);

    console.log("Reviews:", await Review.find({ property_id: property_id }));
    console.log("Bookings:", await Booking.find({ property_id: property_id }));

    res.status(200).json({
      status: "success | OK",
      message: "List Of Reviews",
      success: true,
      data: reviews,
      data_bookingID: await Booking.find({ property_id: property_id }),
      data_ReviewsID: await Review.find({ property_id: property_id }),
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const review_id = req.params.id;
    const review = await Review.findByIdAndDelete(review_id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      status: "success | OK",
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = {
  addReview,
  createReview,
  getReviews,
  updateReviewsById,
  getReviewsByPropertyId,
  deleteReviewById,
};
