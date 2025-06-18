import { db } from '@/db/index.js';
import { Employee, EmployeeFilter, EmployeeInput, PaginationInput } from '../schema/index.js';
import { BadRequestError } from '@/errors/bad-request.error.js';

interface ListAllEmployeesInput {
  selectedColumns: string[];
  filter?: EmployeeFilter;
  pagination?: PaginationInput;
}

async function listAllEmployees({ selectedColumns, filter, pagination }: ListAllEmployeesInput): Promise<Employee[]> {
  let query = db.select(selectedColumns).from('employees');

  // Apply filters dynamically
  if (filter) {
    if (filter.department) {
      query = query.where('department', filter.department);
    }
    if (filter.employment_type) {
      query = query.where('employment_type', filter.employment_type);
    }
    if (filter.employee_status) {
      query = query.where('employee_status', filter.employee_status);
    }
    if (filter.work_location) {
      query = query.where('work_location', filter.work_location);
    }
    if (filter.minSalary !== undefined) {
      query = query.where('salary', '>=', filter.minSalary);
    }
    if (filter.maxSalary !== undefined) {
      query = query.where('salary', '<=', filter.maxSalary);
    }
    // Filter all employee if the employee_status is Terminated
    query = query.whereNot('employee_status', 'Terminated');
  }

  if (pagination) {
    const { limit = 10, page = 0 } = pagination;
    query = query.limit(limit).offset(page * limit);
  }

  const employees = (await query) as Employee[];

  return employees;
}

async function getEmployeeById({ selectedColumns, user_id }: { selectedColumns: string[]; user_id: string }): Promise<Employee | null> {
  const employee = (await db.select(selectedColumns).from('employees').where('user_id', '=', user_id).first()) as Employee;
  return employee || null;
}

async function createEmployee(params: EmployeeInput): Promise<Employee> {
  // Check if the employee already exists
  const existingEmployee = await getEmployeeById({ selectedColumns: ['user_id'], user_id: params.user_id });

  if (existingEmployee?.user_id) {
    throw new BadRequestError({ message: [`Employee with user_id ${params.user_id} already exists.`], code: ['EMPLOYEE_ALREADY_EXISTS'] });
  }

  const [employee] = (await db('employees').insert(params).returning('*')) as Employee[];
  return employee;
}

async function updateEmployeeDetailsById(
  user_id: string,
  updates: Partial<EmployeeInput>,
  selectedColumns: string[] = ['*'], // optionally allow selecting specific fields after update
): Promise<Employee> {
  // Check if employee exists
  const existingEmployee = await getEmployeeById({ selectedColumns: ['user_id'], user_id });

  if (!existingEmployee) {
    throw new BadRequestError({
      message: [`Employee with user_id ${user_id} not found.`],
      code: ['EMPLOYEE_NOT_FOUND'],
    });
  }

  const [updatedEmployee] = (await db('employees').where({ user_id }).update(updates).returning(selectedColumns)) as Employee[];

  return updatedEmployee;
}

export const employeeService = {
  listAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeDetailsById,
};
