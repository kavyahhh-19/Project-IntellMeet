import { Link } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";

function Signup() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-50
      via-purple-50
      to-indigo-100
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
        "
      >
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start collaborating with IntellMeet
          </p>

        </div>

        <form className="space-y-5">

          <div>
            <label className="font-medium">
              Full Name
            </label>

            <div className="relative mt-2">

              <FiUser
                className="
                absolute
                left-4
                top-4
                text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Dhruv Pujari"
                className="
                w-full
                pl-12
                p-3
                border
                rounded-xl
                outline-none
                focus:border-blue-500
                "
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <div className="relative mt-2">

              <FiMail
                className="
                absolute
                left-4
                top-4
                text-gray-400
                "
              />

              <input
                type="email"
                placeholder="you@example.com"
                className="
                w-full
                pl-12
                p-3
                border
                rounded-xl
                outline-none
                focus:border-blue-500
                "
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Password
            </label>

            <div className="relative mt-2">

              <FiLock
                className="
                absolute
                left-4
                top-4
                text-gray-400
                "
              />

              <input
                type="password"
                placeholder="••••••••"
                className="
                w-full
                pl-12
                p-3
                border
                rounded-xl
                outline-none
                focus:border-blue-500
                "
              />
            </div>
          </div>

          <button
            className="
            w-full
            bg-gradient-to-r
            from-purple-600
            to-indigo-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:scale-[1.02]
            transition
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-500">

          Already have an account?

          <Link
            to="/login"
            className="
            text-blue-600
            font-medium
            ml-2
            "
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Signup;