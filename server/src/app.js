const express = require("express");
const cors = require("cors");
const helmet = require("helmet");



const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const messageRoutes = require("./routes/messageRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntellMeet Backend API is live",
    healthCheck: "/api/health",
  });
});

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://project-intell-meet.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IntellMeet backend is running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api", messageRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
