const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  getAllBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controller/bootcamp.controller");
const advancedResults = require("../middleware/advancedResults");
const { isLoggedIn, authorize } = require("../middleware/auth");
const Bootcamp = require("../models/Bootcamp.model");

const courseRouter = require("./course.router");
const reviewRouter = require("./review.router");

router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router
  .route("/")
  .post(isLoggedIn, authorize("publisher", "admin"), createBootcamp)
  .get(advancedResults(Bootcamp, "courses"), getAllBootcamps);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
  .route("/:id")
  .get(getBootcamp)
  .put(isLoggedIn, authorize("publisher", "admin"), updateBootcamp)
  .delete(isLoggedIn, authorize("publisher", "admin"), deleteBootcamp);

router
  .route("/:id/photo")
  .put(isLoggedIn, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
