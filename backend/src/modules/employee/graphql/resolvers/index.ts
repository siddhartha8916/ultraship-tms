import { GQL_Resolvers } from '@/generated/graphql/index.js';
import { getEmployeeResolver, listEmployeesResolver } from './employee.query.js';
import { userService } from '@/modules/user/services/user.service.js';
import { createEmployeeResolver } from './employee.mutation.js';

const resolvers: GQL_Resolvers = {
  Query: {
    listEmployees: listEmployeesResolver,
    getEmployee: getEmployeeResolver,
  },
  Employee: {
    user: async (employee, args) => userService.findByIdOrThrow(employee.user_id),
  },
  Mutation: {
    createEmployee: createEmployeeResolver,
  },
};
export default resolvers;
