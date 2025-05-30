const express = require("express");
const {
  getAllUsers,
  sendMessageToReceiver,
  fetchMessages,
} = require("../controller/chat.controller");
const protectRoute = require("../middleware/protectRoute");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

router.get("/", [protectRoute], getAllUsers);
router.post(
  "/send",
  [protectRoute, uploadImage.single("content")],
  sendMessageToReceiver
);
router.post("/messages", [protectRoute], fetchMessages);

module.exports = router;
