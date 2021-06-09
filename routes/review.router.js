const express = require("express");
const {
  getReviews,
  addReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controller/review.controller");
const advancedResults = require("../middleware/advancedResults");
const { isLoggedIn, authorize } = require("../middleware/auth");
const Review = require("../models/Review.model");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(isLoggedIn, authorize("user", "admin"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(isLoggedIn, authorize("user", "admin"), updateReview)
  .delete(isLoggedIn, authorize("user", "admin"), deleteReview);

module.exports = router;
