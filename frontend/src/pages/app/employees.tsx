import { EmployeeErrorBoundary } from "@/features/Employees/components/ErrorBoundary";
import Employees from "@/features/Employees/Employees";

export default function EmployeesPage() {
  return (
    <div className="flex h-full w-full">
      <EmployeeErrorBoundary>
        <Employees />
      </EmployeeErrorBoundary>
    </div>
  );
}
