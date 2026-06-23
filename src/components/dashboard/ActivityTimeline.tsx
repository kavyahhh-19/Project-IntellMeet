import {
  FiFileText,
  FiUsers,
  FiVideo,
  FiCheckCircle,
} from "react-icons/fi";

function ActivityTimeline() {
  const activities = [
    {
      title: "Sprint Review Meeting",
      time: "2 hours ago",
      icon: <FiVideo />,
    },
    {
      title: "AI Summary Generated",
      time: "3 hours ago",
      icon: <FiFileText />,
    },
    {
      title: "New Member Joined",
      time: "5 hours ago",
      icon: <FiUsers />,
    },
    {
      title: "Task Completed",
      time: "Yesterday",
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-8">
        Activity Timeline
      </h2>

      <div className="space-y-6">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <div
              className="
              w-12
              h-12
              rounded-xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-blue-600
              "
            >
              {item.icon}
            </div>

            <div>
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.time}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ActivityTimeline;