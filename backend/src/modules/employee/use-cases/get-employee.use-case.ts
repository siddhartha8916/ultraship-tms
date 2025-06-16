import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { createSchemaValidator } from '@/utils/index.js';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';
import { Employee } from '../schema/index.js';
import { employeeService } from '../services/employee.service.js';
import { adminAllowedColumns, employeeAllowedColumns } from '../constants/index.js';

const dtoSchema = z.object({
  user_id: z.string().uuid(),
});
const validateDTO = createSchemaValidator(dtoSchema);
export type GetEmployeeDTO = z.infer<typeof dtoSchema>;

type GetEmployeeUseCaseResult = {
  data: Employee | null;
};

export async function getEmployeeUseCase(dto: GetEmployeeDTO, ctx: IContext, info?: GraphQLResolveInfo): Promise<GetEmployeeUseCaseResult> {
  await checkAuthentication(ctx);

  const role = ctx.role;

  // Get allowed columns for the role
  const allowedColumns = role === 'admin' ? adminAllowedColumns : employeeAllowedColumns;

  let selectedColumns: string[] = allowedColumns;

  if (info) {
    const requestedFields = Object.keys(graphqlFields(info));

    // Intersect requested fields with allowed columns
    selectedColumns = requestedFields.filter((field) => allowedColumns.includes(field));

    if (selectedColumns.length === 0) {
      // Fallback to allowed columns if none requested are allowed
      selectedColumns = allowedColumns;
    }
  }

  const { user_id } = await validateDTO(dto);

  const employee = await employeeService.getEmployeeById({ selectedColumns, user_id });

  return {
    data: employee,
  };
}
