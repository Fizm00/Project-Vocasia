const express = require("express");

const auth_controller = require("../controllers/auth/auth_controller");

const router = express.Router();

router.post("/register", auth_controller.registerUser);
// router.post("/login", auth_controller.loginUser);
router.post("/verification-otp", auth_controller.verificationOTP);
// router.post("/resend-otp", auth_controller.resendOTP);
router.post("/send-otp-email", auth_controller.send_otp_email);

module.exports = router;
