const Message = require("../models/Message");
const Meeting = require("../models/Meeting");

const getMeetingMessages = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }

    const isAllowed =
      meeting.host.toString() === req.user._id.toString() ||
      meeting.participants.some(
        (participant) => participant.toString() === req.user._id.toString()
      );

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this meeting chat",
      });
    }

    const messages = await Message.find({ meeting: meetingId })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting messages",
      error: error.message,
    });
  }
};

module.exports = {
  getMeetingMessages,
};