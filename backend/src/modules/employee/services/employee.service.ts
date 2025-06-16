import { db } from '@/db/index.js';
import { Employee, EmployeeFilter, PaginationInput } from '../schema/index.js';

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

export const employeeService = {
  listAllEmployees,
  getEmployeeById,
};
