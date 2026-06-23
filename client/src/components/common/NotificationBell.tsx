import { useState } from "react";
import { FiBell } from "react-icons/fi";

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    "Meeting starts in 10 minutes",
    "AI summary generated",
    "New task assigned",
    "John joined your workspace",
  ];

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
        relative
        p-2
        rounded-xl
        hover:bg-slate-100
        transition
        "
      >
        <FiBell size={22} />

        <span
          className="
          absolute
          -top-1
          -right-1
          bg-red-500
          text-white
          text-xs
          w-5
          h-5
          rounded-full
          flex
          items-center
          justify-center
          "
        >
          4
        </span>
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-3
          w-80
          bg-white
          rounded-2xl
          shadow-2xl
          border
          z-50
          "
        >
          <div className="p-4 border-b">

            <h3 className="font-bold">
              Notifications
            </h3>

          </div>

          <div className="p-3 space-y-2">

            {notifications.map((item) => (
              <div
                key={item}
                className="
                p-3
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
      )}

    </div>
  );
}

export default NotificationBell;