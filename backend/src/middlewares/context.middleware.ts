import { Request, Response, NextFunction } from 'express';

export const initializeRequestContext = (req: Request, res: Response, next: NextFunction) => {
  req.context = {
    userId: null,
    role: undefined,
  };
  next();
};
