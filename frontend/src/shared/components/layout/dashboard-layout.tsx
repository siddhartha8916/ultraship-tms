import { useUserStore } from "@/shared/store";
import { cn } from "@/shared/utils";
import { Navigate, useOutlet } from "react-router";
import AppNavbar from "../ui/Navbar";

// The layout component for dashboard-related pages.
const DashboardLayout = () => {
  const { currentUser } = useUserStore();

  const outlet = useOutlet();

  if (!currentUser?.id) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className={cn("h-screen flex flex-col p-0 m-0")}>
      <div className="flex-none">
        <AppNavbar />
      </div>
      <div className="flex-1 overflow-auto">{outlet}</div>
    </div>
  );
};

export default DashboardLayout;
