const express = require("express");

const {
  saveTranscript,
  getMeetingIntelligence,
  generateSummary,
  createTasksFromActionItems,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/meetings/:meetingId/transcript", saveTranscript);
router.get("/meetings/:meetingId/intelligence", getMeetingIntelligence);
router.post("/meetings/:meetingId/generate-summary", generateSummary);
router.post("/meetings/:meetingId/create-tasks", createTasksFromActionItems);

module.exports = router;