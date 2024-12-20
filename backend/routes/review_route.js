const review_controller = require("../controllers/review_controller");
const authenticateJWT = require("../middleware/authenticateJWT");
const express = require("express");
const router = express.Router();

router.get("/reviews", authenticateJWT, review_controller.getReviews);
router.post("/review", authenticateJWT, review_controller.createReview);
router.put("/review/:id", authenticateJWT, review_controller.updateReviewsById);
router.delete(
  "/review/:id",
  authenticateJWT,
  review_controller.deleteReviewById
);

// get reviews by property ID
router.get("/reviews-property/:id", review_controller.getReviewsByPropertyId);

module.exports = router;
