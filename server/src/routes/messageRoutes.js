const express = require("express");
const { getMeetingMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/meetings/:meetingId/messages", protect, getMeetingMessages);

module.exports = router;