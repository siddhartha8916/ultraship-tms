import {
  useMutation,
  useQuery,
  type MutationResult,
  type OperationVariables,
  type QueryResult,
} from "@apollo/client";
import {  GET_USERS } from "../graphql/queries";
import type { GQL_CreateEmployeeResponse, GQL_UserResponse } from "../models";
import type { EmployeeFormData } from "../components/ConvertUserToEmployee";
import { CONVERT_TO_EMPLOYEE } from "../graphql/mutation";
import { UPDATE_EMPLOYEE } from "@/features/Employees/graphql/mutation";

export const useGetAllUsers = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): QueryResult<GQL_UserResponse, OperationVariables> => {
  return useQuery(GET_USERS, {
    variables: {
      limit,
      page,
    },
    fetchPolicy:"network-only"
  });
};


export const useConvertToEmployee = (): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (input: { input: EmployeeFormData }) => Promise<any>,
  MutationResult<{ createEmployee: GQL_CreateEmployeeResponse }>
] => {
  const [mutate, result] = useMutation<
    { createEmployee: GQL_CreateEmployeeResponse },
    { input: EmployeeFormData }
  >(CONVERT_TO_EMPLOYEE);

  // Wrap mutate to match your expected function signature
  const convertToEmployee = async (input: { input: EmployeeFormData }) => {
    return await mutate({ variables: input });
  };

  return [convertToEmployee, result];
};


export const useUpdateEmployee = (): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (input: { input: EmployeeFormData }) => Promise<any>,
  MutationResult<{ createEmployee: GQL_CreateEmployeeResponse }>
] => {
  const [mutate, result] = useMutation<
    { createEmployee: GQL_CreateEmployeeResponse },
    { input: EmployeeFormData }
  >(UPDATE_EMPLOYEE);

  // Wrap mutate to match your expected function signature
  const updateEmployee = async (input: { input: EmployeeFormData }) => {
    return await mutate({ variables: input });
  };

  return [updateEmployee, result];
};