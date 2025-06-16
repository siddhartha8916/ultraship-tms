import { GQL_MutationResolvers } from '@/generated/graphql/index.js';
import { createEmployeesUseCase } from '../../use-cases/create-employee.use-case.js';
import { employeeFactory } from '../../factories/employee.factory.js';
import { EmployeeInput, EmployeeUpdate } from '../../schema/index.js';
import { mapGQLEmployeeStatusToInternal, mapGQLEmploymentTypeToInternal } from '../../utils.ts/index.js';
import { updateEmployeeUseCase } from '../../use-cases/update-employee.use-case.js';

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

export const updateEmployeeResolver: GQL_MutationResolvers['updateEmployee'] = async (root, args, ctx) => {
  const input = args.input;
  const user_id = args?.user_id;

  if (!user_id) {
    throw new Error('Input and user_id are required to update an employee');
  }

  const updateFields: EmployeeUpdate = {
    user_id: user_id, // required
  };

  if (input.hire_date) {
    updateFields.hire_date = new Date(input.hire_date);
  }
  if (input.department) {
    updateFields.department = input.department;
  }
  if (input.employment_type) {
    updateFields.employment_type = mapGQLEmploymentTypeToInternal(input.employment_type);
  }
  if (input.employee_status) {
    updateFields.employee_status = mapGQLEmployeeStatusToInternal(input.employee_status);
  }
  if (input.work_location) {
    updateFields.work_location = input.work_location;
  }
  if (input.job_title) {
    updateFields.job_title = input.job_title;
  }
  if (input.leave_balance) {
    updateFields.leave_balance = input.leave_balance;
  }
  if (input.work_shift) {
    updateFields.work_shift = input.work_shift;
  }
  if (input.salary) {
    updateFields.salary = input.salary;
  }
  if (input.bonus) {
    updateFields.bonus = input.bonus;
  }
  if (input.bank_account) {
    updateFields.bank_account = input.bank_account;
  }
  if (input.benefits_eligible) {
    updateFields.benefits_eligible = input.benefits_eligible;
  }

  const result = await updateEmployeeUseCase(updateFields, ctx);

  if (!result.data) {
    throw new Error(`Failed to update employee with ID ${user_id}`);
  }

  return employeeFactory.createGQLEmployee(result.data);
};
