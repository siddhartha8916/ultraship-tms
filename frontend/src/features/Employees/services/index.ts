import {
  useMutation,
  useQuery,
  type MutationResult,
  type OperationVariables,
  type QueryResult,
} from "@apollo/client";
import { GET_EMPLOYEES } from "../graphql/queries";
import type {
  EmployeeUpdateInput,
  GQL_DeleteEmployeeResponse,
  GQL_EmployeeResponse,
  GQL_UpdateEmployeeResponse,
} from "../models";
import { DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "../graphql/mutation";

export const useGetAllEmployees = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): QueryResult<GQL_EmployeeResponse, OperationVariables> => {
  return useQuery(GET_EMPLOYEES, {
    variables: {
      limit,
      page,
    },
  });
};

export const useDeleteEmployee = (): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (input: { user_id: string }) => Promise<any>,
  MutationResult<{ deleteEmployee: GQL_DeleteEmployeeResponse }>,
] => {
  const [mutate, result] = useMutation<
    { deleteEmployee: GQL_DeleteEmployeeResponse },
    { user_id: string }
  >(DELETE_EMPLOYEE);

  const deleteEmployee = async (input: { user_id: string }) => {
    return await mutate({
      variables: input,
      refetchQueries: [
        {
          query: GET_EMPLOYEES,
          variables: {
            limit: 5,
            page: 0,
          },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  return [deleteEmployee, result];
};

export const useUpdateEmployee = (): [
  (input: { user_id: string; input: EmployeeUpdateInput }) => Promise<unknown>,
  MutationResult<{ updateEmployee: GQL_UpdateEmployeeResponse }>,
] => {
  const [mutate, result] = useMutation<
    { updateEmployee: GQL_UpdateEmployeeResponse },
    { user_id: string; input: EmployeeUpdateInput }
  >(UPDATE_EMPLOYEE);

  const updateEmployee = async (input: {
    user_id: string;
    input: EmployeeUpdateInput;
  }) => {
    return await mutate({
      variables: input,
      refetchQueries: [
        {
          query: GET_EMPLOYEES,
          variables: {
            limit: 5,
            page: 0,
          },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  return [updateEmployee, result];
};
