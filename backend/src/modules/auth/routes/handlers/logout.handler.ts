/**
 * There are multiple ways to revoke sessions with SuperTokens. Read more from the link below:
 * https://supertokens.io/docs/session/common-customizations/sessions/revoke-session
 */

import { RequestHandler } from 'express';

type ResponseBody = {
  message: string;
};
export const logoutHandler: RequestHandler<any, ResponseBody, any, any> = async (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.send({
    message: 'OK',
  });
};
