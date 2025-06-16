import { GQL_Employee, GQL_EmployeeStatus, GQL_EmploymentType } from '@/generated/graphql/index.js';
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
    employment_type: mapEmploymentType(employee.employment_type),
    employee_status: mapEmployeeStatus(employee.employee_status),
    work_location: employee.work_location,
    salary: employee.salary,
    bonus: employee.bonus,
    bank_account: employee.bank_account,
    benefits_eligible: employee.benefits_eligible,
    leave_balance: employee.leave_balance,
    work_shift: employee.work_shift,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
    // Resolved separately at the resolver, so we set it to null here
    user: null as any,
  };
}

function toResponse(employee: Employee): ResponseEmployee {
  return ResponseEmployeeSchema.parse(employee);
}

function mapEmploymentType(type: string): GQL_EmploymentType {
  switch (type) {
    case 'Full_time':
      return GQL_EmploymentType.FULL_TIME;
    case 'Part_time':
      return GQL_EmploymentType.PART_TIME;
    case 'Contract':
      return GQL_EmploymentType.CONTRACT;
    case 'Intern':
      return GQL_EmploymentType.INTERN;
    default:
      throw new Error(`Unknown employment type: ${type}`);
  }
}

function mapEmployeeStatus(status: string): GQL_EmployeeStatus {
  switch (status) {
    case 'Active':
      return GQL_EmployeeStatus.ACTIVE;
    case 'On_Leave':
      return GQL_EmployeeStatus.ON_LEAVE;
    case 'Terminated':
      return GQL_EmployeeStatus.TERMINATED;
    default:
      throw new Error(`Unknown employee status: ${status}`);
  }
}

export const employeeFactory = {
  createGQLEmployee,
  toResponse,
};
