import { useState } from "react";
import { useGetAllEmployees } from "../services";

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
    limit: 1,
    page: currentPage - 1,
  });

  console.log("Employees data:", data);

  return {
    loading,
    error,
    data,
    columns,
    statusColorMap,
    setCurrentPage,
    currentPage
  };
}
