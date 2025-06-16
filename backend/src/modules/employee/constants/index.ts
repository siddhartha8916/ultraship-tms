const employeeAllowedColumns: string[] = [
  'user_id',
  'job_title',
  'department',
  'hire_date',
  'employment_type',
  'employee_status',
  'work_location',
  'leave_balance',
  'work_shift',
];

const adminAllowedColumns: string[] = [
  ...employeeAllowedColumns,
  'salary',
  'bonus',
  'bank_account',
  'benefits_eligible',
  'created_at',
  'updated_at',
];

export { employeeAllowedColumns, adminAllowedColumns };
