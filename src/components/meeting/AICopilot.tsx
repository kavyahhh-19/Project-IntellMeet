function AICopilot() {
  return (
    <div
      className="
      rounded-3xl
      p-6
      bg-gradient-to-r
      from-indigo-600
      via-purple-600
      to-pink-600
      text-white
      shadow-xl
      "
    >
      <h2 className="text-2xl font-bold">
        AI Copilot
      </h2>

      <div className="mt-5 space-y-3">

        <div className="bg-white/10 p-4 rounded-xl">
          Suggested Action:
          Schedule follow-up with client.
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          Summary:
          Sprint planning discussion completed.
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          Key Decision:
          Dashboard redesign approved.
        </div>

      </div>
    </div>
  );
}

export default AICopilot;