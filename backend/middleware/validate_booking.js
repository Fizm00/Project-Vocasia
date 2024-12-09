const Booking = require("../models/Booking");

const validateBooking = async (req, res, next) => {
  const { property_id, start_date, end_date } = req.body;

  if (!property_id || !start_date || !end_date) {
    return res.status(400).json({
      status: "failed",
      message: "Please fill all fields",
      success: false,
      data: null,
    });
  }

  const conflictBooking = await Booking.findOne({
    property_id,
    $or: [
      { start_date: { $gte: start_date, $lt: end_date } },
      { end_date: { $gt: start_date, $lte: end_date } },
    ],
  });

  if (conflictBooking) {
    return res.status(400).json({
      status: "failed",
      message: "Booking Conflict",
      success: false,
      data: null,
    });
  }

  next();
};

exports.validateBooking = validateBooking;
