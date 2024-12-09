const express = require("express");
const passport = require("passport");

const auth_controller = require("../controllers/auth/auth_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const get_password = require("../controllers/auth/get_password_controller");

const router = express.Router();

router.post("/login", authenticateJWT, auth_controller.loginUser);

router.post("/register", auth_controller.registerUser);
// router.post("/login", auth_controller.loginUser);
router.post("/verification-otp", auth_controller.verificationOTP);
// router.post("/resend-otp", auth_controller.resendOTP);
router.post("/send-otp-email", auth_controller.send_otp_email);

//== oauth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback setelah login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Ubah ke halaman dashboard atau lainnya
  }
);

router.post("/logout", authenticateJWT, auth_controller.logoutUser);

//== end oauth

// == reset password
router.post("/reset-password", get_password.forgotPassword);
router.post("/change-password", authenticateJWT, get_password.changePassword);
// == end reset password

module.exports = router;
