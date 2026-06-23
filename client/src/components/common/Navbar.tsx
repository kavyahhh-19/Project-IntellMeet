import { Link } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import NotificationBell from "./NotificationBell";

import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <nav
      className="
      sticky
      top-0
      z-50
      backdrop-blur-lg
      bg-white/80
      border-b
      border-slate-200
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">

          <MobileMenu />

          <Link to="/">
            <h1
              className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              bg-clip-text
              text-transparent
              "
            >
              IntellMeet
            </h1>
          </Link>

        </div>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="
            text-slate-700
            hover:text-blue-600
            transition
            "
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="
            text-slate-700
            hover:text-blue-600
            transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/meeting-lobby"
            className="
            text-slate-700
            hover:text-blue-600
            transition
            "
          >
            Meetings
          </Link>

          <Link
            to="/workspace"
            className="
            text-slate-700
            hover:text-blue-600
            transition
            "
          >
            Workspace
          </Link>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Search Hint */}

          <button
            className="
            hidden
            lg:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            "
          >
            <FiSearch />

            <span>Search</span>

            <kbd
              className="
              bg-slate-100
              px-2
              py-1
              rounded
              text-xs
              "
            >
              Ctrl K
            </kbd>
          </button>

          {/* Notifications */}

          <NotificationBell />

          {/* Login */}

          <Link
            to="/login"
            className="
            hidden
            md:block
            text-slate-700
            hover:text-blue-600
            transition
            "
          >
            Login
          </Link>

          {/* Signup */}

          <Link
            to="/signup"
            className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            px-5
            py-2.5
            rounded-xl
            shadow-lg
            hover:scale-105
            transition
            "
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;