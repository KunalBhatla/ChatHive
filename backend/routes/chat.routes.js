const express = require("express");
const { getAllUsers } = require("../controller/chat.controller");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();

router.get("/", [protectRoute], getAllUsers);

module.exports = router;
