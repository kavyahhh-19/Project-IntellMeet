const express = require("express");

const {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").post(createMeeting).get(getMeetings);

router
  .route("/:id")
  .get(getMeetingById)
  .put(updateMeeting)
  .delete(deleteMeeting);

module.exports = router;