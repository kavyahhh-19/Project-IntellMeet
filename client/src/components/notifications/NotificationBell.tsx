import { useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    "Meeting starts in 10 minutes",
    "AI Summary generated",
    "New participant joined",
    "Task assigned to you",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <FaBell size={22} />

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {notifications.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-bold">
              Notifications
            </h3>
          </div>

          <div>
            {notifications.map((item, index) => (
              <div
                key={index}
                className="p-3 border-b hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;