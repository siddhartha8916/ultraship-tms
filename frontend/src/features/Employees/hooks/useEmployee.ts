import { useState } from "react";
import { useDeleteEmployee, useGetAllEmployees, useUpdateEmployee } from "../services";
import { toast } from "sonner";
import type { EmployeeUpdateInput } from "../models";

const statusColorMap: Record<
  string,
  "success" | "danger" | "warning" | "default" | "primary" | "secondary"
> = {
  Active: "success",
  Terminated: "danger",
  On_Leave: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "JOB TITLE", uid: "job_title" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "STATUS", uid: "employee_status" },
  { name: "SALARY", uid: "salary" },
  { name: "ACTIONS", uid: "actions" },
];

export default function useEmployees() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useGetAllEmployees({
    limit: 5,
    page: currentPage - 1,
  });

  const [deleteEmployee, result] = useDeleteEmployee();
  const [updateEmployee, updateResult] = useUpdateEmployee();

  const deleteEmployeeHandler = async (userId: string) => {
    try {
      await deleteEmployee({ user_id: userId });
      toast.success("Employee deleted successfully");
    }
    catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  const updateEmployeeHandler = async (userId: string, input: EmployeeUpdateInput) => {
    try {
      await updateEmployee({ user_id: userId, input });
      toast.success("Employee updated successfully");
    }
    catch (error) {
      console.error("Error updating employee:", error);
    }
  }

  return {
    loading,
    error,
    data,
    columns,
    statusColorMap,
    currentPage,
    setCurrentPage,
    deleteEmployeeHandler,
    isDeleteEmployeeLoading: result.loading,
    updateEmployeeHandler,
    isUpdateEmployeeLoading: updateResult.loading,
  };
}
