import Sidebar from "../components/common/Sidebar";

function Workspace() {
  const projects = [
    "IntellMeet Development",
    "Client Dashboard",
    "AI Research Platform",
  ];

  const tasks = [
    "Create Login API",
    "Connect Socket.io",
    "Build Meeting Room",
    "Create Dashboard UI",
  ];

  const members = [
    "Dhruv",
    "Saketh",
    "Gyaneshwar",
    "kavya",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Workspace
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Projects */}
          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">
              Projects
            </h2>

            <div className="space-y-3">

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  {project}
                </div>
              ))}

            </div>

          </div>

          {/* Tasks */}
          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">
              Tasks
            </h2>

            <div className="space-y-3">

              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <input type="checkbox" />
                  <span>{task}</span>
                </div>
              ))}

            </div>

          </div>

          {/* Team */}
          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">
              Team Members
            </h2>

            <div className="space-y-3">

              {members.map((member, index) => (
                <div
                  key={index}
                  className="p-3 bg-purple-50 rounded-lg"
                >
                  {member}
                </div>
              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Workspace;