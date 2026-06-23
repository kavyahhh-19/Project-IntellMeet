import { motion } from "framer-motion";
import {
  FiUsers,
  FiVideo,
  FiCheckSquare,
  FiTrendingUp,
} from "react-icons/fi";

function PremiumStats() {
  const stats = [
    {
      title: "Meetings",
      value: "245",
      icon: <FiVideo size={28} />,
    },
    {
      title: "Participants",
      value: "1,240",
      icon: <FiUsers size={28} />,
    },
    {
      title: "Tasks",
      value: "87",
      icon: <FiCheckSquare size={28} />,
    },
    {
      title: "Growth",
      value: "+24%",
      icon: <FiTrendingUp size={28} />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((stat) => (
        <motion.div
          key={stat.title}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          "
        >
          <div className="text-blue-600 mb-4">
            {stat.icon}
          </div>

          <h3 className="text-gray-500">
            {stat.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stat.value}
          </p>
        </motion.div>
      ))}

    </div>
  );
}

export default PremiumStats;