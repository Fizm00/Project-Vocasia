const express = require("express");

const auth_controller = require("../controllers/auth/auth_controller");

const router = express.Router();

router.post("/register", auth_controller.registerUser);
// router.post("/login", auth_controller.loginUser);
router.post("/verification-otp", auth_controller.verificationOTP);

module.exports = router;
