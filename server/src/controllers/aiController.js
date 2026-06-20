const Meeting = require("../models/Meeting");
const MeetingIntelligence = require("../models/MeetingIntelligence");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

const checkMeetingAccess = async (meetingId, userId) => {
  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    return { allowed: false, status: 404, message: "Meeting not found" };
  }

  const isAllowed =
    meeting.host.toString() === userId.toString() ||
    meeting.participants.some(
      (participant) => participant.toString() === userId.toString()
    );

  if (!isAllowed) {
    return {
      allowed: false,
      status: 403,
      message: "You do not have access to this meeting",
    };
  }

  return { allowed: true, meeting };
};

const saveTranscript = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const access = await checkMeetingAccess(meetingId, req.user._id);

    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const intelligence = await MeetingIntelligence.findOneAndUpdate(
      { meeting: meetingId },
      {
        transcript,
        generatedBy: "manual",
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Transcript saved successfully",
      intelligence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save transcript",
      error: error.message,
    });
  }
};

const getMeetingIntelligence = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const access = await checkMeetingAccess(meetingId, req.user._id);

    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const intelligence = await MeetingIntelligence.findOne({
      meeting: meetingId,
    });

    res.status(200).json({
      success: true,
      intelligence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting intelligence",
      error: error.message,
    });
  }
};

const generateMockSummary = (transcript) => {
  const sentences = transcript
    .split(/[.!?]/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const keyPoints = sentences.slice(0, 3);

  const actionItems = sentences
    .filter((sentence) =>
      /need to|should|must|action|follow up|prepare|complete|finish/i.test(
        sentence
      )
    )
    .slice(0, 5)
    .map((sentence) => ({
      title: sentence,
      priority: /urgent|high|important/i.test(sentence) ? "high" : "medium",
    }));

  return {
    summary:
      sentences.slice(0, 2).join(". ") ||
      "Meeting summary will appear after transcript processing.",
    keyPoints,
    actionItems,
  };
};

const generateSummary = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const access = await checkMeetingAccess(meetingId, req.user._id);

    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const intelligence = await MeetingIntelligence.findOne({
      meeting: meetingId,
    });

    if (!intelligence || !intelligence.transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required before generating summary",
      });
    }

    const generated = generateMockSummary(intelligence.transcript);

    intelligence.summary = generated.summary;
    intelligence.keyPoints = generated.keyPoints;
    intelligence.actionItems = generated.actionItems;
    intelligence.generatedBy = "mock-ai";

    await intelligence.save();

    res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      intelligence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
      error: error.message,
    });
  }
};

const createTasksFromActionItems = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const access = await checkMeetingAccess(meetingId, req.user._id);

    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const intelligence = await MeetingIntelligence.findOne({
      meeting: meetingId,
    });

    if (!intelligence || intelligence.actionItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No action items found for this meeting",
      });
    }

    const tasksPayload = intelligence.actionItems.map((item) => ({
      title: item.title,
      description: `Generated from meeting action item${
        item.assigneeName ? ` for ${item.assigneeName}` : ""
      }`,
      meeting: meetingId,
      createdBy: req.user._id,
      priority: item.priority || "medium",
      dueDate: item.dueDate,
      status: "todo",
    }));

    const tasks = await Task.insertMany(tasksPayload);
    await Notification.create({
      recipient: req.user._id,
      sender: req.user._id,
      type: "action_items_created",
      title: "Action items converted to tasks",
      message: `${tasks.length} task(s) were created from meeting action items.`,
      relatedMeeting: meetingId,
    });

    res.status(201).json({
      success: true,
      message: "Tasks created from action items successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tasks from action items",
      error: error.message,
    });
  }
};

module.exports = {
  saveTranscript,
  getMeetingIntelligence,
  generateSummary,
  createTasksFromActionItems,
};