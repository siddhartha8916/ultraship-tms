import { gql } from "@apollo/client";

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($user_id: ID!) {
    deleteEmployee(user_id: $user_id) {
      employee_status
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($user_id: ID!, $input: EmployeeUpdateInput!) {
    updateEmployee(user_id: $user_id, input: $input) {
      user_id
    }
  }
`;
