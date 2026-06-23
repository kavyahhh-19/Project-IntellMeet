require("dotenv").config();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Meeting = require("./models/Meeting");
const Message = require("./models/Message");

const { connectRedis } = require("./config/redis");

connectDB();

//connectRedis().catch((error) => {
//  console.error("Redis connection skipped:", error.message);
//});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Add Socket.io here
const connectedUsers = new Map();
const meetingParticipants = new Map();

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Socket authentication failed"));
  }
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id} - ${socket.user.email}`);

  connectedUsers.set(socket.user._id.toString(), socket.id);

  socket.on("join-meeting", async ({ meetingId }) => {
    try {
      const meeting = await Meeting.findById(meetingId);

      if (!meetingId) {
        return socket.emit("meeting-error", {
          message: "Meeting ID required",
        });
      }

      if (!meeting) {
        socket.emit("meeting-error", {
          message: "Meeting not found",
        });
        return;
      }

      const isAllowed =
        meeting.host.toString() === socket.user._id.toString() ||
        meeting.participants.some(
          (participant) => participant.toString() === socket.user._id.toString()
        );

      if (!isAllowed) {
        socket.emit("meeting-error", {
          message: "You do not have access to this meeting",
        });
        return;
      }

      socket.join(meetingId);

      if (!meetingParticipants.has(meetingId)) {
        meetingParticipants.set(meetingId, new Map());
      }

      meetingParticipants.get(meetingId).set(socket.user._id.toString(), {
        id: socket.user._id,
        name: socket.user.name,
        email: socket.user.email,
        avatar: socket.user.avatar,
        socketId: socket.id,
      });

      io.to(meetingId).emit("participants-updated", {
        participants: Array.from(meetingParticipants.get(meetingId).values()),
      });

      socket.to(meetingId).emit("participant-joined", {
        user: {
          id: socket.user._id,
          name: socket.user.name,
          email: socket.user.email,
          avatar: socket.user.avatar,
        },
      });

      socket.emit("joined-meeting", {
        meetingId,
        message: "Joined meeting successfully",
      });
    } catch (error) {
      socket.emit("meeting-error", {
        message: "Failed to join meeting",
      });
    }
  });

  socket.on("leave-meeting", ({ meetingId }) => {
    socket.leave(meetingId);

    if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }

    if (meetingParticipants.has(meetingId)) {
      meetingParticipants.get(meetingId).delete(socket.user._id.toString());

      io.to(meetingId).emit("participants-updated", {
        participants: Array.from(meetingParticipants.get(meetingId).values()),
      });
    }

    socket.to(meetingId).emit("participant-left", {
      userId: socket.user._id,
      name: socket.user.name,
    });
  });

  socket.on("send-message", async ({ meetingId, content }) => {
    try {
      if (!content || !content.trim()) {
        return;
      }

      if (!meetingId) {
       return socket.emit("meeting-error", {
        message: "Meeting ID required",
       });
      }

      const message = await Message.create({
        meeting: meetingId,
        sender: socket.user._id,
        content,
      });

      const populatedMessage = await message.populate(
        "sender",
        "name email avatar"
      );

      io.to(meetingId).emit("new-message", {
        message: populatedMessage,
      });
    } catch (error) {
      socket.emit("message-error", {
        message: "Failed to send message",
      });
    }
  });

  socket.on("typing-start", ({ meetingId }) => {

    if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }
    socket.to(meetingId).emit("user-typing", {
      userId: socket.user._id,
      name: socket.user.name,
    });
  });

  socket.on("typing-stop", ({ meetingId }) => {
    if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }
    socket.to(meetingId).emit("user-stopped-typing", {
      userId: socket.user._id,
      name: socket.user.name,
    });
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.user._id.toString());
    console.log(`Socket disconnected: ${socket.id}`);

    meetingParticipants.forEach((participants, meetingId) => {
      if (participants.has(socket.user._id.toString())) {
        if(participants.size==0){
          participants.delete(socket.user._id.toString());
        }
        
        socket.to(meetingId).emit("participant-left", {
          userId: socket.user._id,
          name: socket.user.name,
        });

        io.to(meetingId).emit("participants-updated", {
          participants: Array.from(participants.values()),
        });
      }
    });
  });

  socket.on("webrtc-offer", ({ meetingId, targetUserId, offer }) => {
    if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }
  socket.to(meetingId).emit("webrtc-offer", {
    fromUserId: socket.user._id,
    targetUserId,
    offer,
  });
});

socket.on("webrtc-answer", ({ meetingId, targetUserId, answer }) => {
  if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }
  socket.to(meetingId).emit("webrtc-answer", {
    fromUserId: socket.user._id,
    targetUserId,
    answer,
  });
});

socket.on("webrtc-ice-candidate", ({ meetingId, targetUserId, candidate }) => {
  if (!meetingId) {
      return socket.emit("meeting-error", {
       message: "Meeting ID required",
      });
    }
  socket.to(meetingId).emit("webrtc-ice-candidate", {
    fromUserId: socket.user._id,
    targetUserId,
    candidate,
  });
});

socket.on("toggle-audio", ({ meetingId, isMuted }) => {
  socket.to(meetingId).emit("participant-audio-toggled", {
    userId: socket.user._id,
    name: socket.user.name,
    isMuted,
  });
});

socket.on("toggle-video", ({ meetingId, isVideoOff }) => {
  socket.to(meetingId).emit("participant-video-toggled", {
    userId: socket.user._id,
    name: socket.user.name,
    isVideoOff,
  });
});

socket.on("screen-share-started", ({ meetingId }) => {
  socket.to(meetingId).emit("participant-screen-share-started", {
    userId: socket.user._id,
    name: socket.user.name,
  });
});

socket.on("screen-share-stopped", ({ meetingId }) => {
  socket.to(meetingId).emit("participant-screen-share-stopped", {
    userId: socket.user._id,
    name: socket.user.name,
  });
});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

