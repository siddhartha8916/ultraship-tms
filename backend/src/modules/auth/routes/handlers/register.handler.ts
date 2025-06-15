import { RequestHandler } from 'express';
import { registerUseCase } from '../../use-cases/register.use-case.js';
import { User } from '@/db/schema/index.js';

export const registerHandler: RequestHandler<any, { user: User }, any, any> = async (req, res) => {
  const { email, first_name, last_name, password, middle_name } = req.body as any;

  const result = await registerUseCase(
    {
      email,
      first_name,
      middle_name,
      last_name,
      password,
    },
    req.context,
  );

  res.send({ user: result.user });
};
