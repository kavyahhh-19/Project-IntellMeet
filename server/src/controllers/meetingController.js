const crypto = require("crypto");
const Meeting = require("../models/Meeting");
const { redisClient } = require("../config/redis");

const generateMeetingCode = () => {
  return crypto.randomBytes(4).toString("hex");
};

const createMeeting = async (req, res) => {
  try {
    const { title, description, scheduledAt, durationMinutes, participants } =
      req.body;

    if (!title || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "Title and scheduled date are required",
      });
    }

    const meeting = await Meeting.create({
      title,
      description,
      scheduledAt,
      durationMinutes,
      participants,
      host: req.user._id,
      meetingCode: generateMeetingCode(),
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      meeting,
    });

    if (redisClient.isOpen) {
      await redisClient.del(`meetings:${req.user._id}`);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create meeting",
      error: error.message,
    });
  }
};

const getMeetings = async (req, res) => {
  try {

    const cacheKey = `meetings:${req.user._id}`;

    if (redisClient.isOpen) {
      const cachedMeetings = await redisClient.get(cacheKey);

      if (cachedMeetings) {
        return res.status(200).json({
          success: true,
          cached: true,
          ...JSON.parse(cachedMeetings),
        });
      }
    }
    const meetings = await Meeting.find({
      $or: [{ host: req.user._id }, { participants: req.user._id }],
    })
      .populate("host", "name email avatar")
      .populate("participants", "name email avatar")
      .sort({ scheduledAt: 1 });

    const response = {
      count: meetings.length,
      meetings,
    };

    if (redisClient.isOpen) {
      await redisClient.setEx(cacheKey, 60, JSON.stringify(response));
    }

    res.status(200).json({
      success: true,
      cached: false,
      ...response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
      error: error.message,
    });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate("host", "name email avatar")
      .populate("participants", "name email avatar");

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    const isAllowed =
      meeting.host._id.toString() === req.user._id.toString() ||
      meeting.participants.some(
        (participant) => participant._id.toString() === req.user._id.toString()
      );

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this meeting",
      });
    }

    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting",
      error: error.message,
    });
  }
};

const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    if (meeting.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the host can update this meeting",
      });
    }

    const allowedUpdates = [
      "title",
      "description",
      "scheduledAt",
      "durationMinutes",
      "participants",
      "status",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        meeting[field] = req.body[field];
      }
    });

    await meeting.save();

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      meeting,
    });

    if (redisClient.isOpen) {
      await redisClient.del(`meetings:${req.user._id}`);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update meeting",
      error: error.message,
    });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    if (meeting.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the host can delete this meeting",
      });
    }

    await meeting.deleteOne();

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });

    if (redisClient.isOpen) {
      await redisClient.del(`meetings:${req.user._id}`);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete meeting",
      error: error.message,
    });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};