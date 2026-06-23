import Sidebar from "../components/common/Sidebar";

import VideoGrid from "../components/meeting/VideoGrid";
import MeetingControls from "../components/meeting/MeetingControls";
import ParticipantsPanel from "../components/meeting/ParticipantsPanel";
import ChatPanel from "../components/meeting/ChatPanel";
import AICopilot from "../components/meeting/AICopilot";

import useThemeStore from "../store/themeStore";

function MeetingRoom() {
  const darkMode = useThemeStore(
    (state) => state.darkMode
  );

  return (
    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Product Strategy Meeting
            </h1>

            <p className="text-gray-500 mt-1">
              AI Powered Collaboration Session
            </p>
          </div>

          <div
            className="
            px-4
            py-2
            bg-red-500
            text-white
            rounded-full
            font-medium
            shadow-lg
            animate-pulse
            "
          >
            Recording Live
          </div>

        </div>

        {/* Main Layout */}

        <div className="grid xl:grid-cols-4 gap-6">

          {/* Left Side */}

          <div className="xl:col-span-3">

            <VideoGrid />

            <MeetingControls />

          </div>

          {/* Right Side */}

          <div className="space-y-6">

            <AICopilot />

            <ParticipantsPanel />

            <ChatPanel />

          </div>

        </div>

      </main>
    </div>
  );
}

export default MeetingRoom;