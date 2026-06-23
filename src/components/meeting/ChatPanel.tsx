function ChatPanel() {
  const messages = [
    {
      sender: "Rahul",
      text: "Hello Team 👋",
      time: "10:30 AM",
    },
    {
      sender: "Priya",
      text: "Let's start the meeting.",
      time: "10:31 AM",
    },
    {
      sender: "Dhruv",
      text: "Dashboard redesign looks great.",
      time: "10:33 AM",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="font-bold text-xl">
          Team Chat
        </h2>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Online
        </span>

      </div>

      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">

        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <div className="flex justify-between mb-1">

              <p className="font-semibold">
                {msg.sender}
              </p>

              <span className="text-xs text-gray-400">
                {msg.time}
              </span>

            </div>

            <p className="text-gray-600">
              {msg.text}
            </p>
          </div>
        ))}

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Type a message..."
          className="
          flex-1
          border
          rounded-xl
          p-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

        <button
          className="
          px-5
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          "
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatPanel;