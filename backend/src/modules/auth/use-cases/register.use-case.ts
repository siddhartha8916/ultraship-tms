import { db } from '@/db/index.js';
import { User, UserSchema } from '@/db/schema/index.js';
import { BadInputError, InternalServerError } from '@/errors/index.js';
import { IContext } from '@/shared/interfaces/index.js';
import { bcryptUtil, createSchemaValidator } from '@/utils/index.js';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const dtoSchema = z.object({
  first_name: UserSchema.shape.first_name,
  middle_name: UserSchema.shape.middle_name,
  last_name: UserSchema.shape.last_name,
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
});
const validateDTO = createSchemaValidator(dtoSchema);
type RegisterDTO = z.infer<typeof dtoSchema>;

type RegisterUseCaseResult = {
  user: User;
};
export async function registerUseCase(dto: RegisterDTO, ctx: IContext): Promise<RegisterUseCaseResult> {
  const { first_name, middle_name, last_name, email, password } = await validateDTO(dto);

  const hash = await bcryptUtil.generateHash(password);

  const existingEmail = await db.select('email').table('users').where('email', '=', email).first();
  if (existingEmail) {
    throw new BadInputError({ email: ['Email already taken'] });
  }

  const user = (await db('users').insert(
    {
      id: uuidv4(),
      first_name,
      middle_name,
      last_name,
      email,
      hashed_password: hash,
      updated_at: new Date(),
    },
    ['*'],
  )) as User[];

  if (!user || user.length === 0) {
    throw new InternalServerError('Failed to create user');
  }

  return { user: user[0] };
}
