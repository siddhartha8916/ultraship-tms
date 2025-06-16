import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { createSchemaValidator } from '@/utils/index.js';
import { Employee, EmployeeUpdateSchema } from '../schema/index.js';
import { employeeService } from '../services/employee.service.js';
import { UnauthenticatedError } from '@/errors/unauthenticated.error.js';

const dtoSchema = EmployeeUpdateSchema.extend({
  user_id: z.string().uuid(), // ensure `user_id` is required and valid
});
const validateDTO = createSchemaValidator(dtoSchema);
export type UpdateEmployeeDTO = z.infer<typeof dtoSchema>;

type UpdateEmployeeUseCaseResult = {
  data: Employee;
};

export async function updateEmployeeUseCase(dto: UpdateEmployeeDTO, ctx: IContext): Promise<UpdateEmployeeUseCaseResult> {
  await checkAuthentication(ctx);

  const role = ctx.role;
  if (role !== 'admin') {
    throw new UnauthenticatedError('You do not have permission to update employees.');
  }

  const input = await validateDTO(dto);

  const { user_id, ...updates } = input;

  const updatedEmployee = await employeeService.updateEmployeeDetailsById(user_id, updates);

  return {
    data: updatedEmployee,
  };
}
