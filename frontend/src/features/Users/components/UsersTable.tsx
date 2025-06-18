import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Pagination,
  Tooltip,
} from "@heroui/react";

import React from "react";
import type { ColumnKey, AppUser } from "../models";
import useUsers from "../hooks/useUsers";
import { useUserStore } from "@/shared/store";
import { CircleCheck, CirclePlus } from "lucide-react";
import useCreateEmployeeModalStore from "../state";
import ConvertUserToEmployee from "./ConvertUserToEmployee";

export const UsersTable = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const {
    columns,
    data,
    statusColorMap,
    loading,
    error,
    currentPage,
    setCurrentPage,
  } = useUsers();
  const { openModal } = useCreateEmployeeModalStore();

  const renderCell = React.useCallback(
    (user: AppUser, columnKey: ColumnKey) => {
      switch (columnKey) {
        case "full_name":
          return (
            <User
              name={user.full_name}
              description={user.email}
              avatarProps={{
                radius: "lg",
                src: `https://i.pravatar.cc/150?u=${user.id}`,
              }}
            />
          );
        case "email":
          return user.email;
        case "updated_at":
          return user.updated_at
            ? new Date(user.updated_at).toLocaleDateString()
            : "N/A";
        case "created_at":
          return user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "N/A";
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user?.role] || "default"}
              size="sm"
              variant="flat"
            >
              {user?.role}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              {currentUser?.role === "admin" &&
                (!user?.is_employee ? (
                  <Tooltip content="Convert to employee">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <CirclePlus onClick={() => openModal(user.id)} />
                    </span>
                  </Tooltip>
                ) : (
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <CircleCheck className="text-green-500" />
                  </span>
                ))}
            </div>
          );
        default:
          return user[columnKey];
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
      {!data?.users?.length ? (
        <div className="w-full flex items-center justify-center h-full text-gray-500">
          No data found.
        </div>
      ) : (
        <Table aria-label="Users Table">
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
          <TableBody items={data?.users}>
            {(item) => (
              <TableRow key={item.id}>
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
