import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket";

function MeetingRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  const meetingId = location.state?.meetingId;

  const [participants, setParticipants] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!meetingId) {
      navigate("/meeting-lobby");
      return;
    }

    socket.emit("join-meeting", { meetingId });

    socket.on("participants-updated", (data) => {
      setParticipants(data.participants);
    });

    socket.on("new-message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.emit("leave-meeting", { meetingId });
    };
  }, [meetingId]);

  const sendMessage = () => {
    if (!msg.trim()) return;

    socket.emit("send-message", {
      meetingId,
      content: msg,
    });

    setMsg("");
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">

      {/* LEFT - Participants */}
      <div className="w-1/4 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">Participants</h2>

        {participants.map((p, i) => (
          <div key={i} className="p-2 bg-gray-700 rounded mb-2">
            {p.name}
          </div>
        ))}
      </div>

      {/* CENTER - Meeting Area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="p-3 border-b border-gray-700">
          <h1 className="font-semibold">
            Meeting Room: {meetingId}
          </h1>
        </div>

        {/* Video placeholder */}
        <div className="flex-1 flex items-center justify-center text-gray-400">
          🎥 Video Stream Area (WebRTC ready)
        </div>

      </div>

      {/* RIGHT - Chat */}
      <div className="w-1/4 bg-gray-800 flex flex-col">

        <div className="p-4 border-b border-gray-700">
          Chat
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className="bg-gray-700 p-2 rounded">
              <b>{m.sender?.name || "User"}:</b> {m.content}
            </div>
          ))}
        </div>

        <div className="p-3 flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700"
            placeholder="Type..."
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 px-3 rounded"
          >
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default MeetingRoom;