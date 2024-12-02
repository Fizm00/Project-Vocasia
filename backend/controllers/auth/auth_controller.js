const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../../config/email");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //cek email sudah ada atau belum

    const email_exists = await User.findOne({ email: email });
    if (email_exists) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    // hash atau bcrypt password
    const hashedPassword = await bcrypt.genSalt(12);

    // generate token otp

    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    // send otp via email
    await transporter.sendMail({
      to: email,
      subject: "Verification your account with OTP",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const verificationOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.is_verified = true;
    user.otp = undefined;

    await user.save();

    res.status(200).json({
      message: "User Verified Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  verificationOTP,
};
