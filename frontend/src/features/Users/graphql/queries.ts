import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUsers($limit: Int!, $page: Int!) {
    users(limit: $limit, offset: $page) {
      email
      first_name
      full_name
      id
      role
      is_employee
      updated_at
      created_at
    }
  }
`;
