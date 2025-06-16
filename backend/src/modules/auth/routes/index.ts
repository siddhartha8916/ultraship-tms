import { asyncHandler } from '@/utils/index.js';
import express from 'express';
import { loginHandler } from './handlers/login.handler.js';
import { logoutHandler } from './handlers/logout.handler.js';
import { registerHandler } from './handlers/register.handler.js';

const router = express.Router();

router.post('/api/v1/auth/login', asyncHandler(loginHandler));
router.post('/api/v1/auth/logout', asyncHandler(logoutHandler));
router.post('/api/v1/auth/register', asyncHandler(registerHandler));

export const authRouter = router;
