import { User } from '@/db/schema/index.js';
import { GQL_UserResolvers, GQL_User } from '@/generated/graphql/index.js';
import { employeeService } from '@/modules/employee/services/employee.service.js';

export const fullNameResolver: GQL_UserResolvers['full_name'] = async (parent) => {
  const user = parent as GQL_User & User;
  const name = [user.first_name, user.middle_name, user.last_name]
    .map((x) => (x ? x.trim() : ''))
    .filter((x) => x.trim())
    .join(' ');

  return name;
};

export const isEmployeeResolver: GQL_UserResolvers['is_employee'] = async (parent) => {
  const user = parent as GQL_User & User;
  const employee = await employeeService.getEmployeeById({ selectedColumns: ['user_id'], user_id: user.id });
  return !!employee;
};
