import { AppErrorBoundary } from "@/shared/components/AppErrorBoundary";
import Employees from "@/features/Employees/Employees";

export default function EmployeesPage() {
  return (
    <div className="flex h-full w-full">
      <AppErrorBoundary>
        <Employees />
      </AppErrorBoundary>
    </div>
  );
}
