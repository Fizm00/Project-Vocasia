const express = require("express");
const property_controller = require("../controllers/property_controller");
const upload = require("../middleware/upload_image");

const router = express.Router();

router.get("/properties", property_controller.getProperties);
router.get("/property/:id", property_controller.getPropertyById);

// Gunakan middleware multer untuk menangani upload file
router.post(
  "/property",
  upload.array("images", 10), // Ini adalah tempat kita menggunakan .array() untuk menangani upload gambar
  property_controller.createProperty
);
router.put("/property/:id", property_controller.updatePropertyById);
router.delete("/property/:id", property_controller.deletePropertyById);

console.log("Upload middleware imported:", upload);

module.exports = router;
