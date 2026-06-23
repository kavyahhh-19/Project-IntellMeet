import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const commands = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Meeting Lobby",
      path: "/meeting-lobby",
    },
    {
      label: "Meeting Room",
      path: "/meeting-room",
    },
    {
      label: "Workspace",
      path: "/workspace",
    },
    {
      label: "Profile",
      path: "/profile",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-start
      justify-center
      pt-32
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-full
        max-w-xl
        overflow-hidden
        "
      >
        <div className="p-5 border-b">

          <input
            type="text"
            placeholder="Search commands..."
            className="
            w-full
            p-3
            border
            rounded-xl
            outline-none
            "
            autoFocus
          />

        </div>

        <div className="p-3">

          {commands.map((command) => (
            <button
              key={command.path}
              onClick={() => {
                navigate(command.path);
                setOpen(false);
              }}
              className="
              w-full
              text-left
              p-4
              rounded-xl
              hover:bg-slate-100
              transition
              "
            >
              {command.label}
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}

export default CommandPalette;