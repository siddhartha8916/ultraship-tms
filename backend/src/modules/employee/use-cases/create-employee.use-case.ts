import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { createSchemaValidator } from '@/utils/index.js';
import { Employee, EmployeeInputSchema } from '../schema/index.js';
import { employeeService } from '../services/employee.service.js';
import { UnauthenticatedError } from '@/errors/unauthenticated.error.js';

const dtoSchema = EmployeeInputSchema;
const validateDTO = createSchemaValidator(dtoSchema);
export type CreateEmployeesDTO = z.infer<typeof dtoSchema>;

type CreateEmployeesUseCaseResult = {
  data: Employee;
};

export async function createEmployeesUseCase(dto: CreateEmployeesDTO, ctx: IContext): Promise<CreateEmployeesUseCaseResult> {
  await checkAuthentication(ctx);

  const role = ctx.role;
  if (role !== 'admin') {
    throw new UnauthenticatedError('You do not have permission to create employees.');
  }

  const input = await validateDTO(dto);
  const employee = await employeeService.createEmployee(input);

  return {
    data: employee,
  };
}
