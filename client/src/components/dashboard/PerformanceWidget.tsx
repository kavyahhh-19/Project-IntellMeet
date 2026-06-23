function PerformanceWidget() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-xl font-bold mb-6">
        Team Performance
      </h2>

      <div className="space-y-5">

        <div>
          <div className="flex justify-between mb-2">
            <span>Productivity</span>
            <span>92%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full">
            <div className="bg-blue-600 h-3 rounded-full w-[92%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Meeting Efficiency</span>
            <span>88%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full">
            <div className="bg-green-600 h-3 rounded-full w-[88%]" />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>AI Accuracy</span>
            <span>98%</span>
          </div>

          <div className="bg-gray-200 h-3 rounded-full">
            <div className="bg-purple-600 h-3 rounded-full w-[98%]" />
          </div>
        </div>

      </div>

    </div>
  );
}

export default PerformanceWidget;