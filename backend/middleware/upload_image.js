const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Menentukan folder tujuan upload
  },
  filename: (req, file, cb) => {
    cb(null, "name:code-" + Date.now() + path.extname(file.originalname)); // Menyusun nama file
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      "Error: File upload hanya mendukung tipe file berikut - " + allowedTypes
    );
  }
};

// Inisialisasi multer tanpa memanggil .array()
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal ukuran file 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
