import useThemeStore from "../../store/themeStore";

function ActionItems() {
  const darkMode = useThemeStore(
    (state) => state.darkMode
  );

  const tasks = [
    "Connect Backend API",
    "Implement Socket.io",
    "Add AI Transcription",
    "Deploy Frontend",
  ];

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        Action Items
      </h2>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <input type="checkbox" />
            <span>{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionItems;