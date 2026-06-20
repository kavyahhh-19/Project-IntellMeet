const Task = require("../models/Task");
const Notification = require("../models/Notification");

const createTask = async (req, res) => {
  try {
    const { title, description, meeting, assignee, status, priority, dueDate } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      meeting,
      assignee,
      status,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    const populatedTask = await task.populate([
      { path: "createdBy", select: "name email avatar" },
      { path: "assignee", select: "name email avatar" },
      { path: "meeting", select: "title scheduledAt status" },
    ]);


    if (assignee && assignee.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: assignee,
        sender: req.user._id,
        type: "task_assigned",
        title: "New task assigned",
        message: `You were assigned a task: ${task.title}`,
        relatedTask: task._id,
        relatedMeeting: meeting,
      });
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;

    const filter = {
      $or: [{ createdBy: req.user._id }, { assignee: req.user._id }],
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .populate("createdBy", "name email avatar")
      .populate("assignee", "name email avatar")
      .populate("meeting", "title scheduledAt status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "name email avatar")
      .populate("assignee", "name email avatar")
      .populate("meeting", "title scheduledAt status");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const isAllowed =
      task.createdBy._id.toString() === req.user._id.toString() ||
      task.assignee?._id.toString() === req.user._id.toString();

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this task",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const isAllowed =
      task.createdBy.toString() === req.user._id.toString() ||
      task.assignee?.toString() === req.user._id.toString();

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to update this task",
      });
    }

    const allowedUpdates = [
      "title",
      "description",
      "assignee",
      "status",
      "priority",
      "dueDate",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    const populatedTask = await task.populate([
      { path: "createdBy", select: "name email avatar" },
      { path: "assignee", select: "name email avatar" },
      { path: "meeting", select: "title scheduledAt status" },
    ]);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the creator can delete this task",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};