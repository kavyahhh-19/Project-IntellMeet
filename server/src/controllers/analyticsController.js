const Meeting = require("../models/Meeting");
const Task = require("../models/Task");
const MeetingIntelligence = require("../models/MeetingIntelligence");
const Notification = require("../models/Notification");

const getOverviewAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetingFilter = {
      $or: [{ host: userId }, { participants: userId }],
    };

    const taskFilter = {
      $or: [{ createdBy: userId }, { assignee: userId }],
    };

    const [
      totalMeetings,
      upcomingMeetings,
      completedMeetings,
      totalTasks,
      pendingTasks,
      completedTasks,
      highPriorityTasks,
      aiSummariesGenerated,
      unreadNotifications,
    ] = await Promise.all([
      Meeting.countDocuments(meetingFilter),
      Meeting.countDocuments({
        ...meetingFilter,
        scheduledAt: { $gte: new Date() },
        status: { $ne: "cancelled" },
      }),
      Meeting.countDocuments({
        ...meetingFilter,
        status: "completed",
      }),
      Task.countDocuments(taskFilter),
      Task.countDocuments({
        ...taskFilter,
        status: { $in: ["todo", "in-progress"] },
      }),
      Task.countDocuments({
        ...taskFilter,
        status: "done",
      }),
      Task.countDocuments({
        ...taskFilter,
        priority: "high",
      }),
      MeetingIntelligence.countDocuments({
        summary: { $ne: "" },
      }),
      Notification.countDocuments({
        recipient: userId,
        isRead: false,
      }),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        meetings: {
          total: totalMeetings,
          upcoming: upcomingMeetings,
          completed: completedMeetings,
        },
        tasks: {
          total: totalTasks,
          pending: pendingTasks,
          completed: completedTasks,
          highPriority: highPriorityTasks,
        },
        ai: {
          summariesGenerated: aiSummariesGenerated,
        },
        notifications: {
          unread: unreadNotifications,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch overview analytics",
      error: error.message,
    });
  }
};

const getMeetingAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetingFilter = {
      $or: [{ host: userId }, { participants: userId }],
    };

    const [byStatus, upcomingMeetings] = await Promise.all([
      Meeting.aggregate([
        { $match: meetingFilter },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Meeting.find({
        ...meetingFilter,
        scheduledAt: { $gte: new Date() },
        status: { $ne: "cancelled" },
      })
        .sort({ scheduledAt: 1 })
        .limit(5)
        .select("title scheduledAt durationMinutes status meetingCode"),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        byStatus,
        upcomingMeetings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meeting analytics",
      error: error.message,
    });
  }
};

const getTaskAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const taskFilter = {
      $or: [{ createdBy: userId }, { assignee: userId }],
    };

    const [byStatus, byPriority, overdueTasks] = await Promise.all([
      Task.aggregate([
        { $match: taskFilter },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Task.aggregate([
        { $match: taskFilter },
        {
          $group: {
            _id: "$priority",
            count: { $sum: 1 },
          },
        },
      ]),
      Task.find({
        ...taskFilter,
        dueDate: { $lt: new Date() },
        status: { $ne: "done" },
      })
        .sort({ dueDate: 1 })
        .limit(5)
        .populate("meeting", "title")
        .select("title priority status dueDate meeting"),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        byStatus,
        byPriority,
        overdueTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getOverviewAnalytics,
  getMeetingAnalytics,
  getTaskAnalytics,
};