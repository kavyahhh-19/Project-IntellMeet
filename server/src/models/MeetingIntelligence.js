const mongoose = require("mongoose");

const actionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    assigneeName: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { _id: false }
);

const meetingIntelligenceSchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      unique: true,
    },
    transcript: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    keyPoints: [
      {
        type: String,
      },
    ],
    actionItems: [actionItemSchema],
    generatedBy: {
      type: String,
      enum: ["manual", "mock-ai", "openai", "huggingface"],
      default: "mock-ai",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MeetingIntelligence",
  meetingIntelligenceSchema
);