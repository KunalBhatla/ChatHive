const express = require("express");
const {
  welcome,
  registerUser,
  loginUser,
  checkUser,
} = require("../controller/auth.controller");
const protectRoute = require("../middleware/protectRoute");
const uploadImage = require("../middleware/uploadFile");

const router = express.Router();

router.get("/", welcome);
router.post("/register", [uploadImage.single("profile")], registerUser);
router.post("/login", loginUser);
router.get("/check", [protectRoute], checkUser);

module.exports = router;
