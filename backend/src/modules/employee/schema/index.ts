import { z } from 'zod';

const created_at = z.coerce.date();
const updated_at = z.coerce.date();

export enum EmployeeEmploymentType {
  CONTRACT = 'Contract',
  FULL_TIME = 'Full_time',
  INTERN = 'Intern',
  PART_TIME = 'Part_time',
}

export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On_Leave',
  TERMINATED = 'Terminated',
}

export const EmployeeSchema = z
  .object({
    user_id: z.string().uuid(),
    job_title: z.string().min(1),
    department: z.string().min(1),
    hire_date: z.coerce.date(),
    employment_type: z.enum([
      EmployeeEmploymentType.FULL_TIME,
      EmployeeEmploymentType.PART_TIME,
      EmployeeEmploymentType.CONTRACT,
      EmployeeEmploymentType.INTERN,
    ]),
    employee_status: z.enum([EmployeeStatus.ACTIVE, EmployeeStatus.ON_LEAVE, EmployeeStatus.TERMINATED]),
    work_location: z.string().min(1),
    salary: z.number().nonnegative(),
    bonus: z.number().nonnegative().optional(),
    bank_account: z.string().min(5),
    benefits_eligible: z.boolean().default(false),
    leave_balance: z.number().int().nonnegative().default(0),
    work_shift: z.string().min(1).default('Morning'),
  })
  .merge(
    z.object({
      created_at,
      updated_at,
    }),
  );

export type Employee = z.infer<typeof EmployeeSchema>;

export const EmployeeFilterSchema = z
  .object({
    department: z.string().optional(),
    employment_type: z
      .enum([
        EmployeeEmploymentType.FULL_TIME,
        EmployeeEmploymentType.PART_TIME,
        EmployeeEmploymentType.CONTRACT,
        EmployeeEmploymentType.INTERN,
      ])
      .optional(),
    employee_status: z.enum([EmployeeStatus.ACTIVE, EmployeeStatus.ON_LEAVE, EmployeeStatus.TERMINATED]).optional(),
    work_location: z.string().optional(),
    minSalary: z.number().min(0).optional(),
    maxSalary: z.number().min(0).optional(),
  })
  .refine(
    (data) => {
      if (data.minSalary !== undefined && data.maxSalary !== undefined) {
        return data.minSalary <= data.maxSalary;
      }
      return true;
    },
    {
      message: 'minSalary cannot be greater than maxSalary',
      path: ['minSalary', 'maxSalary'],
    },
  );

export type EmployeeFilter = z.infer<typeof EmployeeFilterSchema>;

export const PaginationInputSchema = z.object({
  page: z.number().int().min(1, 'Page number must be at least 1'),
  limit: z.number().int().min(1, 'Limit must be at least 1'),
});

export type PaginationInput = z.infer<typeof PaginationInputSchema>;

export const EmployeeInputSchema = EmployeeSchema.omit({
  created_at: true,
  updated_at: true,
})
  .partial()
  .extend({
    user_id: z.string().uuid(),
    hire_date: z.coerce.date(),
    job_title: z.string().min(1),
    salary: z.number().nonnegative(),
    employment_type: z.enum([
      EmployeeEmploymentType.FULL_TIME,
      EmployeeEmploymentType.PART_TIME,
      EmployeeEmploymentType.CONTRACT,
      EmployeeEmploymentType.INTERN,
    ]),
    employee_status: z.enum([EmployeeStatus.ACTIVE, EmployeeStatus.ON_LEAVE, EmployeeStatus.TERMINATED]),
  });

export type EmployeeInput = z.infer<typeof EmployeeInputSchema>;
