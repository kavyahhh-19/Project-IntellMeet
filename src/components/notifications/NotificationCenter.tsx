function NotificationCenter() {
  const notifications = [
    "Meeting summary generated",
    "New participant joined",
    "Task assigned to you",
    "Meeting starts in 10 minutes",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-xl font-bold mb-5">
        Notifications
      </h2>

      <div className="space-y-3">

        {notifications.map((item) => (
          <div
            key={item}
            className="
            p-4
            rounded-xl
            bg-slate-50
            hover:bg-slate-100
            transition
            "
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default NotificationCenter;