const User = require("../../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generatePassword = require("generate-password");

require("dotenv").config();

// change password in profile
const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword, confirmedPassword } = req.body;
  try {
    // Validasi input
    if (!oldPassword || !newPassword || !confirmedPassword) {
      return res.status(400).json({
        status: "failed",
        message:
          "Old Password, New Password, and Confirmed Password are required",
        success: false,
        data: null,
      });
    }

    // cek apakah password baru cocok dengan password konfirmasi
    if (newPassword !== confirmedPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirmed Password do not match",
        success: false,
        data: null,
      });
    }

    // Cek user dari database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User Not Found",
        success: false,
        data: null,
      });
    }

    // Cek password lama
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Old Password Not Match",
        success: false,
        data: null,
      });
    }

    // Validasi panjang password
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: "failed",
        message: "Password must be at least 8 characters",
        success: false,
        data: null,
      });
    }

    // Cek apakah password lama sama dengan password baru
    if (newPassword === oldPassword) {
      return res.status(400).json({
        status: "failed",
        message: "The new password cannot be the same as the old password",
        success: false,
        data: null,
      });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password di database
    console.log(user);
    user.password = hashedPassword;
    user.updated_at = new Date();
    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      message: "Password Changed Successfully",
      success: true,
      data: { id: user._id, updatedAt: user.updated_at },
      user,
      // updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Error: ${error.message}`,
      success: false,
      data: null,
    });
  }
};

// reset password by email
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // search id user by email
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Email is required",
        success: false,
        data: null,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User Not Found",
        success: false,
        data: null,
      });
    }

    // generate token
    const tokenNewPassword = generatePassword.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
    });

    //hash password
    const hashedPassword = await bcrypt.hash(tokenNewPassword, 12);

    //update password di database
    user.password = hashedPassword;
    user.updated_at = new Date();
    const updatedUser = await user.save();

    // send email
    //= Pengirim password by Email =
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //= Penerima Password By Email =
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Your New Password is ${tokenNewPassword}`,
    };

    const cekMailOptions = await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "Password Changed Successfully",
      success: true,
      data: { id: user._id, updatedAt: user.updated_at },
      user,
      updatedUser,
      cekMailOptions,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Error: ${error.message}`,
      success: false,
      data: null,
    });
  }
};
module.exports = { changePassword, forgotPassword };
