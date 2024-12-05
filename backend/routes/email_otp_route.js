const express = require("express");
const email_otp_controller = require("../controllers/email/email_otp_controller");
const router = express.Router();

// Rute untuk mengirim email
router.post("/send-email", email_otp_controller.send_email_otp);

module.exports = router;
