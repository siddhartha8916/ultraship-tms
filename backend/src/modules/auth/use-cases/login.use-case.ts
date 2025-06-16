import { UnauthenticatedError } from '@/errors/index.js';
import { IContext } from '@/shared/interfaces/index.js';
import { bcryptUtil, createSchemaValidator } from '@/utils/index.js';
import { z } from 'zod';
import { User, UserFull, UserSchema } from '@/db/schema/index.js';
import { db } from '@/db/index.js';

const dtoSchema = z.object({
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
});
const validateDTO = createSchemaValidator(dtoSchema);
export type LoginDTO = z.infer<typeof dtoSchema>;

type LoginUseCaseResult = {
  user: User;
};
export async function loginUseCase(dto: LoginDTO, ctx: IContext): Promise<LoginUseCaseResult> {
  const { email, password } = await validateDTO(dto);

  const user = (await db.select('*').table('users').where('email', '=', email).first()) as UserFull | undefined;

  if (user) {
    const isValidPassword = await bcryptUtil.verify(password, user.hashed_password);

    if (isValidPassword) {
      return {
        user,
      };
    }
  }

  throw new UnauthenticatedError('Invalid username/email or password');
}
