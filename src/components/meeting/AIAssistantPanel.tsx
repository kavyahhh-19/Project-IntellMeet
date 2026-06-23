function AIAssistantPanel() {
  return (
    <div
      className="
      bg-gradient-to-r
      from-indigo-600
      to-purple-600
      text-white
      rounded-3xl
      p-6
      shadow-xl
      "
    >
      <h2 className="text-2xl font-bold">
        AI Assistant
      </h2>

      <p className="mt-4 opacity-90">
        Meeting summary is being generated...
      </p>

      <div
        className="
        mt-6
        bg-white/10
        p-4
        rounded-2xl
        "
      >
        <p>
          • 3 action items detected
        </p>

        <p>
          • Sprint review completed
        </p>

        <p>
          • Client follow-up required
        </p>
      </div>
    </div>
  );
}

export default AIAssistantPanel;