import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Sidebar from "../components/common/Sidebar";

function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

          <h1 className="text-4xl font-bold mb-6">
            Profile
          </h1>

          <div className="space-y-4">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <h2 className="text-xl font-semibold">
                {user?.name || "Guest"}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <h2 className="text-xl font-semibold">
                {user?.email || "No Email"}
              </h2>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </main>

    </div>
  );
}

export default Profile;