const express = require("express");
const booking_controller = require("../controllers/booking_controller");
const authenticateJWT = require("../middleware/authenticateJWT");

const router = express.Router();

router.get("/bookings", booking_controller.getBooking);
router.get("/booking/:id", booking_controller.getBookingById);
router.post("/booking", authenticateJWT, booking_controller.createBooking);
router.post(
  "/midtrans-notification",
  booking_controller.handleMidtransNotification
);
// router.put("/booking/:id", booking_controller.updateBookingById);
// router.delete("/booking/:id", booking_controller.deleteBookingById);

module.exports = router;
