const express = require("express");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;