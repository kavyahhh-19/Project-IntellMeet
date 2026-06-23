import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
        w-10
        h-10
        rounded-full
        bg-slate-100
        flex
        items-center
        justify-center
        "
      >
        <FiUser />
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-3
          w-56
          bg-white
          rounded-2xl
          shadow-2xl
          border
          z-50
          "
        >
          <div className="p-4 border-b">

            <h3 className="font-semibold">
              Dhruv
            </h3>

            <p className="text-sm text-gray-500">
              dhruv@example.com
            </p>

          </div>

          <div className="p-2">

            <Link
              to="/profile"
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

            <button
              className="
              w-full
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              hover:bg-slate-100
              text-left
              "
            >
              <FiSettings />
              Settings
            </button>

            <button
              className="
              w-full
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              hover:bg-red-50
              text-red-600
              text-left
              "
            >
              <FiLogOut />
              Logout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProfileDropdown;