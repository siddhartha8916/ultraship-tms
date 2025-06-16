import { GQL_QueryResolvers } from '@/generated/graphql/index.js';
import { listEmployeesUseCase } from '../../use-cases/list-employees.use-case.js';
import { employeeFactory } from '../../factories/employee.factory.js';
import { getEmployeeUseCase } from '../../use-cases/get-employee.use-case.js';

export const listEmployeesResolver: GQL_QueryResolvers['listEmployees'] = async (root, args, ctx, info) => {
  const cleanedFilter = Object.fromEntries(Object.entries(args.filter || {}).filter(([_, value]) => value !== null));

  const result = await listEmployeesUseCase(
    {
      page: args.pagination?.page ?? 0,
      limit: args.pagination?.limit ?? 10,
      filter: cleanedFilter,
    },
    ctx,
    info,
  );

  return result.data.map((employee) => employeeFactory.createGQLEmployee(employee));
};

export const getEmployeeResolver: GQL_QueryResolvers['getEmployee'] = async (root, args, ctx) => {
  const result = await getEmployeeUseCase(
    {
      user_id: args.user_id,
    },
    ctx,
  );

  if (!result.data) {
    throw new Error(`Employee with ID ${args.user_id} not found`);
  }

  return employeeFactory.createGQLEmployee(result.data);
};
