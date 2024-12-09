const express = require("express");
const upload = require("../middleware/upload_images");

const property_controller = require("../controllers/property_controller");
const authenticateToken = require("../middleware/authenticate_token");

const router = express.Router();

router.get("/properties", property_controller.getProperties);
router.get("/property/:id", property_controller.getPropertyById);
router.post(
  "/property",
  authenticateToken,
  upload.array("images", 10),
  property_controller.createProperty
);
router.put("/property/:id", property_controller.updatePropertyById);
router.delete(
  "/property/:id",
  authenticateToken,
  property_controller.deletePropertyById
);

module.exports = router;
