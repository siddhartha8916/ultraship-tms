import { useState } from "react";
import { useGetAllUsers } from "../services";

const statusColorMap: Record<
  string,
  "success" | "danger" | "warning" | "default" | "primary" | "secondary"
> = {
  admin: "success",
  employee: "warning",
};

const columns = [
  { name: "NAME", uid: "full_name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROLE", uid: "role" },
  { name: "UPDATED AT", uid: "updated_at" },
  { name: "CREATED AT", uid: "created_at" },
  { name: "EMPLOYEE", uid: "actions" },
];

export default function useUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useGetAllUsers({
    limit: 5,
    page: currentPage - 1,
  });

  return {
    loading,
    error,
    data,
    columns,
    statusColorMap,
    currentPage,
    setCurrentPage,
  };
}
