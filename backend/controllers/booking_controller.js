const Booking = require("../models/Booking");

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.find();

    res.status(200).json({
      status: "success | OK",
      message: "List Of Booking",
      success: true,
      data: booking,
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

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.length === 0 || booking === null) {
      return res.status(404).json({
        status: "failed",
        message: "Booking Not Found",
        success: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success | OK",
      message: "Booking By Id",
      success: true,
      data: booking,
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

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    console.log("booking:" + booking);

    const newBooking = await Booking.findById(booking._id).populate("user_id");
    res.status(200).json({
      status: "success | OK",
      message: "Booking Created Successfully",
      success: true,
      data: newBooking,
    });

    const savedNewBooking = await newBooking.save();

    console.log("savedNewBooking:" + savedNewBooking);
  } catch (error) {
    res.status(400).json({
      status: "failed bookings ni bro",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = { getBooking, getBookingById, createBooking };
