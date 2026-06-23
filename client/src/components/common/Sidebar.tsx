import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiVideo,
  FiBriefcase,
  FiUser,
  FiChevronRight,
} from "react-icons/fi";

import useAuthStore from "../../store/authStore";
import useThemeStore from "../../store/themeStore";

function Sidebar() {
  const user = useAuthStore((state) => state.user);

  const darkMode = useThemeStore(
    (state) => state.darkMode
  );

  const activeClass = darkMode
    ? `
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      text-white
      shadow-lg
    `
    : `
      bg-gradient-to-r
      from-blue-500
      to-indigo-500
      text-white
      shadow-lg
    `;

  const normalClass = darkMode
    ? `
      text-gray-300
      hover:bg-slate-800
    `
    : `
      text-gray-700
      hover:bg-gray-100
    `;

  return (
    <aside
      className={`
      w-72
      min-h-screen
      flex
      flex-col
      border-r
      ${
        darkMode
          ? "bg-slate-950 border-slate-800"
          : "bg-white border-gray-200"
      }
      `}
    >
      {/* Logo */}

      <div className="p-6">

        <div
          className="
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-purple-600
          rounded-2xl
          p-5
          text-white
          shadow-xl
          "
        >
          <h1 className="text-2xl font-bold">
            IntellMeet
          </h1>

          <p className="text-sm opacity-90 mt-1">
            AI Meeting Platform
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4">

        <p
          className={`
          text-xs
          uppercase
          tracking-widest
          mb-4
          px-3
          ${
            darkMode
              ? "text-gray-500"
              : "text-gray-400"
          }
          `}
        >
          Navigation
        </p>

        <div className="space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              transition-all
              duration-300
              ${
                isActive
                  ? activeClass
                  : normalClass
              }
              `
            }
          >
            <div className="flex items-center gap-3">
              <FiGrid size={20} />
              <span>Dashboard</span>
            </div>

            <FiChevronRight />
          </NavLink>

          <NavLink
            to="/meeting-lobby"
            className={({ isActive }) =>
              `
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              transition-all
              duration-300
              ${
                isActive
                  ? activeClass
                  : normalClass
              }
              `
            }
          >
            <div className="flex items-center gap-3">
              <FiVideo size={20} />
              <span>Meeting Lobby</span>
            </div>

            <FiChevronRight />
          </NavLink>

          <NavLink
            to="/workspace"
            className={({ isActive }) =>
              `
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              transition-all
              duration-300
              ${
                isActive
                  ? activeClass
                  : normalClass
              }
              `
            }
          >
            <div className="flex items-center gap-3">
              <FiBriefcase size={20} />
              <span>Workspace</span>
            </div>

            <FiChevronRight />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              transition-all
              duration-300
              ${
                isActive
                  ? activeClass
                  : normalClass
              }
              `
            }
          >
            <div className="flex items-center gap-3">
              <FiUser size={20} />
              <span>Profile</span>
            </div>

            <FiChevronRight />
          </NavLink>

        </div>

      </nav>

      {/* User Card */}

      <div className="p-4">

        <div
          className={`
          rounded-2xl
          p-4
          border
          ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-gray-50 border-gray-200"
          }
          `}
        >
          <div className="flex items-center gap-3">

            <div
              className="
              w-12
              h-12
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              "
            >
              {user?.name?.charAt(0) || "G"}
            </div>

            <div>
              <h3 className="font-semibold">
                {user?.name || "Guest"}
              </h3>

              <p
                className={`
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                {user?.email ||
                  "guest@intelmeet.com"}
              </p>
            </div>

          </div>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;