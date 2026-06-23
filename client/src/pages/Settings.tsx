import Sidebar from "../components/common/Sidebar";

function Settings() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Settings
        </h1>

        <div className="grid gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Account Settings
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-3 rounded-xl"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border p-3 rounded-xl"
              />

              <button
                className="
                bg-blue-600
                text-white
                px-6
                py-3
                rounded-xl
                "
              >
                Save Changes
              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Preferences
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">

                <span>Email Notifications</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>Meeting Reminders</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>Dark Mode</span>

                <input type="checkbox" />

              </label>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;