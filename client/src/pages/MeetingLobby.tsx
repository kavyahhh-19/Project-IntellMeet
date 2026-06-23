import { useNavigate } from "react-router-dom";
import useMeetingStore from "../store/meetingStore";
import { useState } from "react";

function MeetingLobby() {
  const navigate = useNavigate();
  const { setMeetingTitle } = useMeetingStore();

  const [meetingId, setMeetingId] = useState("");

  const joinMeeting = () => {
    if (!meetingId.trim()) {
      alert("Enter Meeting ID");
      return;
    }

    setMeetingTitle(meetingId);

    navigate("/meeting-room", {
      state: { meetingId },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Meeting Lobby
        </h1>

        <input
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          placeholder="Enter Meeting ID"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={joinMeeting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Join Meeting
        </button>

      </div>
    </div>
  );
}

export default MeetingLobby;