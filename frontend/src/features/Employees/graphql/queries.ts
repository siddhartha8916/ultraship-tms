import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetAllEmployees($limit: Int!, $page: Int!) {
    listEmployees(pagination: { limit: $limit, page: $page }) {
      bank_account
      benefits_eligible
      bonus
      created_at
      department
      employee_status
      employment_type
      hire_date
      job_title
      leave_balance
      salary
      updated_at
      work_location
      work_shift
      user {
        email
        full_name
        id
      }
    }
  }
`;
