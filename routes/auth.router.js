const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  updatePassword,
  updateDetails,
} = require("../controller/auth.controller");
const { isLoggedIn } = require("../middleware/auth");
const router = express.Router({ mergeParams: true });

router.route("/signup").post(register);
router.route("/signin").post(login);
router.get("/logout", logout);
router.route("/me").get(isLoggedIn, getMe);
router.put("/updatedetails", isLoggedIn, updateDetails);
router.put("/updatepassword", isLoggedIn, updatePassword);

module.exports = router;
