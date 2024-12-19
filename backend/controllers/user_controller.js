const User = require("../models/User");
const bcrypt = require("bcrypt");

const getuser = async (req, res) => {
  try {
    // === default or normal get ===
    // const users = await User.find({});

    // hide password
    const users = await User.find({}).select("-password");

    // hide password saat get data users
    users.forEach((user) => {
      user.password = undefined;
    });
    // end hide password

    res.status(200).json({
      status: "success | OK",
      message: "List Of Users",
      success: true,
      data: users,
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

const getuserbyid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success | OK",
      message: "List Of User By Id",
      success: true,
      data: user,
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

const createuser = async (req, res) => {
  try {
    const user = new User(req.body);

    // === cek pengguna berdasarkan email apakah sudah terdaftar atau belum ===

    const email_exists = await User.findOne({ email: req.body.email });
    if (email_exists) {
      res.status(400).json({
        status: "failed",
        message: "Email Already Exists",
        success: false,
        data: null,
      });
    }

    // === end cek email ===

    // === hash atau bcrypt password ===

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    // === end hash password ===

    await user.save();
    res.status(200).json({
      status: "success | OK",
      message: "User Created Successfully",
      success: true,
      data: user,
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

const updateuser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success | OK",
      message: "User Updated Successfully",
      success: true,
      data: user,
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

const deleteuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success | OK",
      message: "User Deleted Successfully",
      success: true,
      data: user,
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

module.exports = {
  getuser,
  getuserbyid,
  createuser,
  updateuser,
  deleteuser,
};
