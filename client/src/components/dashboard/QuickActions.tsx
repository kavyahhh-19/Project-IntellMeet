function QuickActions() {
  const actions = [
    "Create Meeting",
    "Join Meeting",
    "Generate Summary",
    "Invite Team",
  ];

  return (
    <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action}
            className="
            p-4
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
            text-white
            font-medium
            hover:scale-105
            transition
            "
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;