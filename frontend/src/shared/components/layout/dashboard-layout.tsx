

import { useUserStore } from "@/shared/store";
import { cn } from "@/shared/utils";
import { Navigate, useOutlet } from "react-router";

// The layout component for dashboard-related pages.
const DashboardLayout = () => {
  const { currentUser } = useUserStore();

  const outlet = useOutlet();

  if (!currentUser?.id) {
    return <Navigate to="/auth/login" />;
  }

  return <div className={cn("h-screen flex flex-col flex-1 p-0 m-0")}>{outlet}</div>;
};

export default DashboardLayout;
