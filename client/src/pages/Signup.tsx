import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { signupUser } from "../services/authService";
import useAuthStore from "../store/authStore";

function Signup() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await signupUser(formData);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setUser(response.user);

    alert("Account created successfully!");

    navigate("/dashboard");
  } catch (error: any) {
    alert(error?.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start collaborating with IntellMeet
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="font-medium">
              Full Name
            </label>

            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full pl-12 p-3 border rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-12 p-3 border rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">
              Password
            </label>

            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-12 p-3 border rounded-xl outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-medium ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;