import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

function AnalyticsChart() {
  const data = [
    { month: "Jan", meetings: 40 },
    { month: "Feb", meetings: 65 },
    { month: "Mar", meetings: 85 },
    { month: "Apr", meetings: 70 },
    { month: "May", meetings: 120 },
    { month: "Jun", meetings: 150 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-[350px]">

      <h2 className="text-xl font-bold mb-6">
        Meeting Analytics
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>

          <XAxis dataKey="month" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="meetings"
            stroke="#2563eb"
            fill="#93c5fd"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;