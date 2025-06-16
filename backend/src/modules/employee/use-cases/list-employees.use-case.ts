import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { createSchemaValidator } from '@/utils/index.js';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';
import { Employee, EmployeeFilterSchema } from '../schema/index.js';
import { employeeService } from '../services/employee.service.js';
import { adminAllowedColumns, employeeAllowedColumns } from '../constants/index.js';

const dtoSchema = z.object({
  page: z.number(),
  limit: z.number().max(100),
  filter: EmployeeFilterSchema.optional(),
});
const validateDTO = createSchemaValidator(dtoSchema);
export type ListEmployeesDTO = z.infer<typeof dtoSchema>;

type ListEmployeesUseCaseResult = {
  data: Employee[];
};

export async function listEmployeesUseCase(
  dto: ListEmployeesDTO,
  ctx: IContext,
  info?: GraphQLResolveInfo,
): Promise<ListEmployeesUseCaseResult> {
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

  const { page, limit, filter } = await validateDTO(dto);

  const employees = await employeeService.listAllEmployees({
    selectedColumns: ['user_id', ...selectedColumns],
    filter,
    pagination: { page, limit },
  });

  return {
    data: employees,
  };
}
