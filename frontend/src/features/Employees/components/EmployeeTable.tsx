import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
} from "@heroui/react";
import useEmployees from "../hooks/useEmployee";

import { Eye, PencilIcon, Trash2 } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import React from "react";
import type { ColumnKey, Employee } from "../models";
import { useUserStore } from "@/shared/store";
import useUpdateEmployeeModalStore from "../state";
import ConvertUserToEmployee from "@/features/Users/components/ConvertUserToEmployee";

export const EmployeesTable = () => {
  const {
    columns,
    data,
    statusColorMap,
    loading,
    error,
    currentPage,
    setCurrentPage,
    deleteEmployeeHandler,
  } = useEmployees();
  const currentUser = useUserStore((state) => state.currentUser);
  const { openModal } = useUpdateEmployeeModalStore();

  const renderCell = React.useCallback(
    (employee: Employee, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "name":
          return (
            <User
              name={employee.user.full_name}
              description={employee.job_title}
              avatarProps={{
                radius: "lg",
                src: `https://i.pravatar.cc/150?u=${employee.user.id}`,
              }}
            />
          );
        case "email":
          return employee?.user.email;
        case "job_title":
          return employee?.job_title;
        case "department":
          return employee?.department;
        case "employee_status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[employee?.employee_status] || "default"}
              size="sm"
              variant="flat"
            >
              {employee?.employee_status}
            </Chip>
          );
        case "salary":
          return employee?.salary
            ? `$${employee?.salary?.toLocaleString()}`
            : "N/A";
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Dropdown>
                    <DropdownTrigger>
                      <Eye />
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label={`Details of ${employee.user.full_name}`}
                    >
                      <DropdownItem key={`name-${employee.user_id}`}>
                        <strong>Name:</strong> {employee.user.full_name}
                      </DropdownItem>
                      <DropdownItem key={`email-${employee.user_id}`}>
                        <strong>Email:</strong> {employee.user.email}
                      </DropdownItem>
                      <DropdownItem key={`department-${employee.user_id}`}>
                        <strong>Department:</strong>{" "}
                        {employee.department || "N/A"}
                      </DropdownItem>
                      <DropdownItem key={`job-${employee.user_id}`}>
                        <strong>Job Title:</strong>{" "}
                        {employee.job_title || "N/A"}
                      </DropdownItem>
                      <DropdownItem key={`salary-${employee.user_id}`}>
                        <strong>Salary:</strong>{" "}
                        {employee.salary
                          ? `$${employee.salary.toLocaleString()}`
                          : "N/A"}
                      </DropdownItem>
                      <DropdownItem key={`employment-type-${employee.user_id}`}>
                        <strong>Employment Type:</strong>{" "}
                        {employee.employment_type}
                      </DropdownItem>
                      <DropdownItem key={`hire-date-${employee.user_id}`}>
                        <strong>Hire Date:</strong>{" "}
                        {new Date(employee.hire_date).toLocaleDateString()}
                      </DropdownItem>
                      <DropdownItem key={`leave-${employee.user_id}`}>
                        <strong>Leave Balance:</strong> {employee.leave_balance}{" "}
                        days
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </span>
              </Tooltip>
              {currentUser?.role === "admin" && (
                <Tooltip content="Edit employee">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <PencilIcon onClick={() => openModal(employee)} />
                  </span>
                </Tooltip>
              )}
              {currentUser?.role === "admin" && (
                <Tooltip color="danger" content="Delete employee">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Trash2
                      onClick={() => deleteEmployeeHandler(employee.user.id)}
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        default:
          return employee[columnKey];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    <>
      <ConvertUserToEmployee />
      {!data?.listEmployees?.length ? (
        <div className="w-full flex items-center justify-center h-full text-gray-500">
          No data found.
        </div>
      ) : (
        <Table aria-label="Employee Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data?.listEmployees}>
            {(item) => (
              <TableRow key={item.user.id}>
                {(columnKey) => {
                  return (
                    <TableCell>
                      {renderCell(item, columnKey as ColumnKey)}
                    </TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <div className="mt-auto flex items-center justify-center">
        <Pagination page={currentPage} total={10} onChange={setCurrentPage} />
      </div>
    </>
  );
};
