import { userFactory } from '@/modules/user/factories/user.factory.js';
import { ResponseUserFull } from '@/modules/user/responses/user.response.js';
import { RequestHandler } from 'express';
import { loginUseCase } from '../../use-cases/login.use-case.js';
import jwtAuthenticator from '@/utils/jwt.util.js';

type ResponseBody = {
  user: ResponseUserFull;
};
export const loginHandler: RequestHandler<any, ResponseBody, any, any> = async (req, res) => {
  const { email, password } = req.body as any;

  const { user } = await loginUseCase(
    {
      email,
      password,
    },
    req.context,
  );
  // 1. Sign the JWT
  const token = jwtAuthenticator.sign({
    email,
    role: user.role,
    userId: user.id,
  });

  // 3. Return the response with the Set-Cookie header
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000,
    sameSite: 'strict',
  });

  res.send({
    user: userFactory.toFullResponse(user),
  });
};
