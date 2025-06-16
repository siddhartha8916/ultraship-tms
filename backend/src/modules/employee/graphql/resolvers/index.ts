import { GQL_Resolvers } from '@/generated/graphql/index.js';
import { listEmployeesResolver } from './employee.query.js';
import { userService } from '@/modules/user/services/user.service.js';

const resolvers: GQL_Resolvers = {
  Query: {
    listEmployees: listEmployeesResolver,
  },
  Employee: {
    user: async (employee, args) => userService.findByIdOrThrow(employee.user_id),
  },
};
export default resolvers;
