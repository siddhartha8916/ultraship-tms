import { Pagination } from "@heroui/react";

import useEmployees from "./hooks/useEmployee";
import { EmployeesTable } from "./components/EmployeeTable";

function Employees() {
  const { error, loading, setCurrentPage, currentPage } = useEmployees();

  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-full animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="w-full flex items-center justify-center h-full text-red-500">
        Error : {error.message}
      </div>
    );

  return (
    <div className="p-5 flex flex-col w-full">
      <EmployeesTable />
      <div className="mt-auto flex items-center justify-center">
        <Pagination page={currentPage} total={10} onChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default Employees;
