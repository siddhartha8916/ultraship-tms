import { GQL_MutationResolvers } from '@/generated/graphql/index.js';
import { createEmployeesUseCase } from '../../use-cases/create-employee.use-case.js';
import { employeeFactory } from '../../factories/employee.factory.js';
import { EmployeeInput } from '../../schema/index.js';
import { mapGQLEmployeeStatusToInternal, mapGQLEmploymentTypeToInternal } from '../../utils.ts/index.js';

export const createEmployeeResolver: GQL_MutationResolvers['createEmployee'] = async (root, args, ctx) => {
  if (!args.input || !args.input.user_id) {
    throw new Error('Input and user_id are required to create an employee');
  }

  const employeeInput: EmployeeInput = {
    user_id: args.input.user_id,
    hire_date: new Date(args.input.hire_date),
    department: args.input.department || '',
    employment_type: mapGQLEmploymentTypeToInternal(args.input.employment_type),
    employee_status: mapGQLEmployeeStatusToInternal(args.input.employee_status),
    work_location: args.input.work_location || '',
    job_title: args.input.job_title || '',
    leave_balance: args.input.leave_balance ?? 0,
    work_shift: args.input.work_shift || 'Morning',
    salary: args.input.salary ?? 0,
    bonus: args.input.bonus ?? 0,
    bank_account: args.input.bank_account || '',
    benefits_eligible: args.input.benefits_eligible ?? false,
  };

  if (Object.keys(employeeInput).length === 0) {
    throw new Error('No valid employee data provided');
  }
  const result = await createEmployeesUseCase(employeeInput, ctx);

  if (!result.data) {
    throw new Error(`Employee with ID ${args.input.user_id} not found`);
  }

  return employeeFactory.createGQLEmployee(result.data);
};
