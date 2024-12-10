const review_controller = require("../controllers/review_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const express = require("express");
const router = express.Router();

router.get("/reviews", authenticateJWT, review_controller.getReviews);
router.post("/review", authenticateJWT, review_controller.createReview);

module.exports = router;
