import { gql } from "@apollo/client";

export const CONVERT_TO_EMPLOYEE = gql`
  mutation ConvertUserToEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      user_id
      job_title
      department
      salary
    }
  }
`;