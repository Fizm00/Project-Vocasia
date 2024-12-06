const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Request Body:", req.body);
    console.log("File Info:", file);

    const userId = req.body.user_id;
    if (!userId) {
      return cb(new Error("User ID is required"), null);
    }
    //     cb(null, "../storages/uploads/images/" + User._id);
    // const uploadPath = path.join(__dirname, "storages", "uploads", "images");

    const uploadPath = path.join(
      __dirname,
      "..",
      "storages",
      "uploads",
      "images",
      userId
    );
    // Buat folder jika belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    //   cb(null, uploadPath);
    // }
    cb(null, uploadPath); // Folder tempat menyimpan file
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname + path.extname(file.originalname)
    );
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
