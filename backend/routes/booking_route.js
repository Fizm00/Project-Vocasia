const express = require("express");
const booking_controller = require("../controllers/booking_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const verifyMidtransSignature = require("../middleware/verify_midtrans_signature");

const router = express.Router();

router.get("/bookings", authenticateJWT, booking_controller.getBooking);
router.get("/booking/:id", authenticateJWT, booking_controller.getBookingById);
router.post("/booking", authenticateJWT, booking_controller.createBooking);
router.post(
  "/midtrans-notification",
  // verifyMidtransSignature,
  booking_controller.handleAfterBooking
);

module.exports = router;
