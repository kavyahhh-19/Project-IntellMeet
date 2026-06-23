import {
  FiTrendingUp,
  FiTarget,
  FiZap,
} from "react-icons/fi";

function AIInsights() {
  return (
    <div
      className="
      bg-gradient-to-r
      from-slate-900
      via-indigo-900
      to-slate-900
      text-white
      rounded-3xl
      p-8
      shadow-xl
      "
    >
      <div className="flex items-center justify-between mb-8">

        <div>
          <span
            className="
            bg-white/10
            px-4
            py-2
            rounded-full
            text-sm
            "
          >
            AI Intelligence Center
          </span>

          <h2 className="text-3xl font-bold mt-4">
            Insights Generated For Your Team
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/10 rounded-2xl p-6">
          <FiTrendingUp size={28} />

          <h3 className="mt-4 font-semibold text-lg">
            Productivity Growth
          </h3>

          <p className="text-gray-300 mt-2">
            Meetings are 25% shorter than last week.
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6">
          <FiTarget size={28} />

          <h3 className="mt-4 font-semibold text-lg">
            Goal Completion
          </h3>

          <p className="text-gray-300 mt-2">
            82% action items completed on time.
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6">
          <FiZap size={28} />

          <h3 className="mt-4 font-semibold text-lg">
            AI Efficiency
          </h3>

          <p className="text-gray-300 mt-2">
            Saved 14 hours using AI summaries.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AIInsights;