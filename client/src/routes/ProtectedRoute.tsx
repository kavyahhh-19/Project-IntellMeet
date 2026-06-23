import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;