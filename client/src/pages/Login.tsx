import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);


  const [formData, setFormData] = useState({
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

    const user = await loginUser(
      formData.email,
      formData.password
    );

    setUser(user);

    alert("Login successful!");

    navigate("/dashboard");
  } catch (error: any) {
    alert(error?.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue using IntellMeet
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-600 font-medium ml-2"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;