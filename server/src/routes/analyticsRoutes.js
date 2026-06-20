const express = require("express");

const {
  getOverviewAnalytics,
  getMeetingAnalytics,
  getTaskAnalytics,
} = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/overview", getOverviewAnalytics);
router.get("/meetings", getMeetingAnalytics);
router.get("/tasks", getTaskAnalytics);

module.exports = router;