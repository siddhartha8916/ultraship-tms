import { z } from 'zod';

// Basic schema (you can adjust types or required fields as needed)
export const ResponseEmployeeSchema = z.object({
  user_id: z.string().uuid(),
  job_title: z.string(),
  department: z.string().nullable(),
  hire_date: z.coerce.date().transform((d) => d.toISOString()),
  employment_type: z.string(),
  employee_status: z.string(),
  work_location: z.string(),
  salary: z.number(),
  bonus: z.number().nullable(),
  bank_account: z.string(),
  benefits_eligible: z.boolean(),
  leave_balance: z.number().int(),
  work_shift: z.string(),
  created_at: z.coerce.date().transform((d) => d.toISOString()),
  updated_at: z.coerce.date().transform((d) => d.toISOString()),
});

export type ResponseEmployee = z.infer<typeof ResponseEmployeeSchema>;
