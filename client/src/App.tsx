import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import useAuthStore from "./store/authStore";

function App() {
  const loadUser = useAuthStore((s) => s.loadUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading IntellMeet...
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;