import { BadRequestError } from '@/errors/bad-request.error.js';
import jwtAuthenticator from '@/utils/jwt.util.js';
import { Request, Response, NextFunction } from 'express';

export const checkAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  if (['/api/v1/auth/login', '/api/v1/auth/register'].includes(req.path)) {
    return next(); // Skip authentication for login and register routes
  }
  const token = req.cookies.authToken;

  if (token) {
    try {
      const decoded = jwtAuthenticator.verify(token);
      const isTokenExpired = jwtAuthenticator.isTokenExpired(token);

      if (isTokenExpired) {
        res.clearCookie('authToken', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        return next(new BadRequestError({ message: ['Token has expired'], code: ['token_expired'] }));
      }
      const { userId, role } = decoded || {};

      if (!userId || !role) {
        return next(new BadRequestError({ message: ['No userId or role found in token'], code: ['no_userId_or_role'] }));
      }

      req.context.userId = userId || null; // Set userId from token, or null if not present
      req.context.role = role || 'employee'; // Default to 'employee' if no role is provided

      return next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return next(new BadRequestError({ message: ['Unable to parse token'], code: ['token_parse_error'] }));
    }
  } else {
    return next(new BadRequestError({ message: ['No token found'], code: ['no_token'] }));
  }
};

export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.context?.role;
  if (role !== 'admin') {
    throw new BadRequestError({ message: ['You are not an admin'], code: ['not_admin'] });
  }
  next();
};

export const checkAdminOrProfessorRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.context?.role;
  if (!['employee', 'admin'].includes(role)) {
    throw new BadRequestError({
      message: ['You are not allowed to manage course'],
      code: ['not_allowed_to_manage_course'],
    });
  }
  next();
};
