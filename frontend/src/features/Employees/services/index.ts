import {
  useQuery,
  type OperationVariables,
  type QueryResult,
} from "@apollo/client";
import { GET_EMPLOYEES } from "../graphql/queries";
import type { GQL_EmployeeResponse } from "../models";

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
