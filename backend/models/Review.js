const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },

  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
