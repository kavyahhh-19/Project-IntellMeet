import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiVideo,
  FiFolder,
  FiUser,
  FiSettings,
  FiLogIn,
} from "react-icons/fi";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}

      <button
        onClick={() => setOpen(true)}
        className="
        md:hidden
        p-2
        rounded-lg
        hover:bg-slate-100
        "
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}

      {open && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          z-50
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}

      <div
        className={`
        fixed
        top-0
        left-0
        h-full
        w-72
        bg-white
        shadow-2xl
        z-50
        transform
        transition-transform
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
      >
        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          p-5
          border-b
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            text-blue-600
            "
          >
            IntellMeet
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="p-2"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}

        <div className="p-4 space-y-2">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiHome />
            Home
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiGrid />
            Dashboard
          </Link>

          <Link
            to="/meeting-lobby"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiVideo />
            Meeting Lobby
          </Link>

          <Link
            to="/workspace"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiFolder />
            Workspace
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiUser />
            Profile
          </Link>

          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiSettings />
            Settings
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-100
            "
          >
            <FiLogIn />
            Login
          </Link>

        </div>
      </div>
    </>
  );
}

export default MobileMenu;