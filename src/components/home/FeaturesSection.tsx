import {
  FiCpu,
  FiUsers,
  FiFileText,
  FiZap,
} from "react-icons/fi";

function FeaturesSection() {
  const features = [
    {
      title: "AI Summaries",
      desc: "Generate meeting summaries instantly.",
      icon: <FiCpu size={32} />,
    },
    {
      title: "Team Collaboration",
      desc: "Work together in real time.",
      icon: <FiUsers size={32} />,
    },
    {
      title: "Action Items",
      desc: "Track tasks automatically.",
      icon: <FiFileText size={32} />,
    },
    {
      title: "Productivity Boost",
      desc: "Save hours every week.",
      icon: <FiZap size={32} />,
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition"
          >
            <div className="text-blue-600 mb-4">
              {feature.icon}
            </div>

            <h3 className="font-bold text-xl mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;