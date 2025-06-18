import Users from "@/features/Users/Users";
import { AppErrorBoundary } from "@/shared/components/AppErrorBoundary";
import { useUserStore } from "@/shared/store";
import { Navigate } from "react-router";

export default function UsersPage() {
  const currentUser = useUserStore((state) => state.currentUser);

  if (currentUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex h-full w-full">
      <AppErrorBoundary>
        <Users />
      </AppErrorBoundary>
    </div>
  );
}
