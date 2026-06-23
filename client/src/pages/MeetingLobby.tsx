import { useNavigate } from "react-router-dom";
import useMeetingStore from "../store/meetingStore";

function MeetingLobby() {
  const navigate = useNavigate();

  const {
    meetingTitle,
    setMeetingTitle,
  } = useMeetingStore();

  const joinMeeting = () => {
    navigate("/meeting-room");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Meeting Lobby
        </h1>

        <input
          type="text"
          value={meetingTitle}
          onChange={(e) =>
            setMeetingTitle(e.target.value)
          }
          placeholder="Meeting Title"
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