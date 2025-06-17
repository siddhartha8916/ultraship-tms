import { UserSchema } from "@/shared/schema";
import { z } from "zod";

const created_at = z.coerce.date();
const updated_at = z.coerce.date();

const EmployeeEmploymentType = {
  CONTRACT: "Contract",
  FULL_TIME: "Full_time",
  INTERN: "Intern",
  PART_TIME: "Part_time",
} as const;

export type EmployeeEmploymentType =
  (typeof EmployeeEmploymentType)[keyof typeof EmployeeEmploymentType];

export const EmployeeStatus = {
  ACTIVE: "Active",
  ON_LEAVE: "On_Leave",
  TERMINATED: "Terminated",
} as const;

export type EmployeeStatus =
  (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

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
    employee_status: z.enum([
      EmployeeStatus.ACTIVE,
      EmployeeStatus.ON_LEAVE,
      EmployeeStatus.TERMINATED,
    ]),
    work_location: z.string().min(1),
    salary: z.number().nonnegative(),
    bonus: z.number().nonnegative().optional(),
    bank_account: z.string().min(5),
    benefits_eligible: z.boolean().default(false),
    leave_balance: z.number().int().nonnegative().default(0),
    work_shift: z.string().min(1).default("Morning"),
  })
  .merge(
    z
      .object({
        created_at,
        updated_at,
      })
      .merge(
        z.object({
          user: UserSchema.extend({
            full_name: z.string(),
          }),
        })
      )
  );

export type Employee = z.infer<typeof EmployeeSchema>;

export type GQL_EmployeeResponse = {
  listEmployees: Employee[];
};


export type ColumnKey =
  | "name"
  | "email"
  | "job_title"
  | "department"
  | "employee_status"
  | "salary"
  | "actions";
