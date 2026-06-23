import Sidebar from "../components/common/Sidebar";

import PremiumStats from "../components/dashboard/PremiumStats";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import NotificationCenter from "../components/notifications/NotificationCenter";
import PerformanceWidget from "../components/dashboard/PerformanceWidget";

import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";

function Dashboard() {
  const user = useAuthStore((s) => s.user);

 

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Welcome back, {user?.name || "Guest"}
          </p>

          <PremiumStats />

          <div className="mt-8">
            <AnalyticsChart />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <NotificationCenter />
            <PerformanceWidget />
          </div>

        </motion.div>

      </main>

    </div>
  );
}

export default Dashboard;