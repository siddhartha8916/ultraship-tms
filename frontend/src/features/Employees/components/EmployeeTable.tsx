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
} from "@heroui/react";
import useEmployees from "../hooks/useEmployee";

import { Eye, PencilIcon, Trash2 } from "lucide-react";

import React from "react";
import type { ColumnKey, Employee } from "../models";

export const EmployeesTable = () => {
  const { columns, data, statusColorMap } = useEmployees();
  
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
          return employee.user.email;
        case "job_title":
          return employee.job_title;
        case "department":
          return employee.department;
        case "employee_status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[employee.employee_status] || "default"}
              size="sm"
              variant="flat"
            >
              {employee.employee_status}
            </Chip>
          );
        case "salary":
          return `$${employee.salary.toLocaleString()}`;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Eye />
                </span>
              </Tooltip>
              <Tooltip content="Edit employee">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <PencilIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete employee">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Trash2 />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return employee[columnKey];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
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
  );
};
