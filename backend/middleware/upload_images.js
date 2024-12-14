const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Request Body:", req.body);
    console.log("File Info:", file);
    cb(null, "public/uploads"); // Folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type :File harus berupa gambar dengan format JPEG, PNG, atau JPG"
      ),
      null,
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = upload;
