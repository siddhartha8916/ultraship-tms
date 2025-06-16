import { GQL_Employee } from '@/generated/graphql/index.js';
import { ResponseEmployee, ResponseEmployeeSchema } from '../responses/employee.response.js';
import { Employee } from '../schema/index.js';

/**
 * Maps database employee record to GraphQL Employee type.
 */
function createGQLEmployee(employee: Employee): GQL_Employee {
  return {
    user_id: employee.user_id,
    job_title: employee.job_title,
    department: employee.department,
    hire_date: employee.hire_date,
    employment_type: employee.employment_type,
    employee_status: employee.employee_status,
    work_location: employee.work_location,
    salary: employee.salary,
    bonus: employee.bonus,
    bank_account: employee.bank_account,
    benefits_eligible: employee.benefits_eligible,
    leave_balance: employee.leave_balance,
    work_shift: employee.work_shift,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
  };
}

function toResponse(employee: Employee): ResponseEmployee {
  return ResponseEmployeeSchema.parse(employee);
}

export const employeeFactory = {
  createGQLEmployee,
  toResponse,
};
