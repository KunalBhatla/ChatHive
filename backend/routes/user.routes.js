const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const {
  getCurrentUserDetails,
  updateCurrentUserDetails,
} = require("../controller/user.controller");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

router.get("/", [protectRoute], getCurrentUserDetails);
router.patch(
  "/update",
  [protectRoute, uploadImage.single("profile")],
  updateCurrentUserDetails
);

module.exports = router;
