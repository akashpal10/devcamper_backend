const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/course.controller");
const advancedResults = require("../middleware/advancedResults");
const { isLoggedIn, authorize } = require("../middleware/auth");
const Course = require("../models/Course.model");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getAllCourses
  )
  .post(isLoggedIn, authorize("publisher", "admin"), addCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(isLoggedIn, authorize("publisher", "admin"), updateCourse)
  .delete(isLoggedIn, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
