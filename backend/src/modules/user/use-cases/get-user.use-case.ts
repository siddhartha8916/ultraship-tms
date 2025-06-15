import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import type { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { userService } from '../services/user.service.js';
import { User, UserSchema } from '@/db/schema/index.js';
import { createSchemaValidator } from '@/utils/index.js';

const dtoSchema = z.object({
  userId: UserSchema.shape.id,
});
const validateDTO = createSchemaValidator(dtoSchema);
type GetUserDTO = z.infer<typeof dtoSchema>;

type GetUserUseCaseResult = {
  user: User;
};
export async function getUserUseCase(dto: GetUserDTO, ctx: IContext): Promise<GetUserUseCaseResult> {
  await checkAuthentication(ctx);

  const { userId } = await validateDTO(dto);

  const user = await userService.findByIdOrThrow(userId);

  return {
    user,
  };
}
