const express = require("express");

const property_controller = require("../controllers/property_controller");

const router = express.Router();

router.get("/properties", property_controller.getProperties);
router.get("/property/:id", property_controller.getPropertyById);
router.post("/property", property_controller.createProperty);
router.put("/property/:id", property_controller.updatePropertyById);
router.delete("/property/:id", property_controller.deletePropertyById);

module.exports = router;
