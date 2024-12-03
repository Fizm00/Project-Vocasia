const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../../config/email");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // OTP 6 digit

    // Simpan user baru ke database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    // Kirim OTP melalui email
    const mailInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Pastikan ini valid
      to: email,
      subject: "Verify Your Account with OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    console.log("Email sent: ", mailInfo.response); // Logging hasil pengiriman

    res.status(200).json({
      message:
        "User Created Successfully. Please verify your email with the OTP.",
    });
  } catch (error) {
    res.status(500).json({ message: "Register User :" + error.message });
    console.error("Error sending email: ", error);
    throw new Error("Failed to send OTP email.");
  }
};

const send_otp_email = async (req, res) => {
  const { email } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // OTP 6 digit

    // Kirim OTP melalui email
    const mailInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Pastikan ini valid
      to: email,
      subject: "Verify Your Account with OTP", // Sesuaikan dengan subjek email Anda
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    // Perbarui OTP di database
    user.otp = otp;
    await user.save();

    res.status(200).json({ message: "OTP Email Sent Successfully" + mailInfo });
  } catch (error) {
    res.status(500).json({ message: "Send OTP Email :" + error.message });
  }
};

const verificationOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Validasi OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Perbarui status verifikasi dan hapus OTP
    user.is_verified = true;
    user.otp = undefined;

    await user.save();

    res.status(200).json({ message: "User Verified Successfully" });
  } catch (error) {
    res.status(500).json({
      message:
        " Verfification OTP :apakah ini error missing credentials :" +
        error.message,
    });
  }
};

module.exports = {
  registerUser,
  verificationOTP,
  send_otp_email,
};
