import useNotificationStore from "../../store/notificationStore";

function NotificationCenter() {
  const notifications = useNotificationStore((s) => s.notifications);
  const clear = useNotificationStore((s) => s.clear);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-full">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>

        <button
          onClick={clear}
          className="text-sm text-red-500"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">

        {notifications.length === 0 ? (
          <p className="text-gray-400">No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg text-sm ${
                n.type === "success"
                  ? "bg-green-100"
                  : n.type === "warning"
                  ? "bg-red-100"
                  : "bg-blue-100"
              }`}
            >
              {n.message}
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default NotificationCenter;