import { Router } from 'express';
import { validateAccessToken } from '../middlewares/validate-access-token.middleware';
import { authRouter } from './auth.router';
import { linksRouter } from './links.router';
import { publicRouter } from './public.router';
import { usersRouter } from './users.router';

export const v1MainRouter: Router = Router();

v1MainRouter.use('/users', validateAccessToken, usersRouter);
v1MainRouter.use('/links', validateAccessToken, linksRouter);
v1MainRouter.use('/auth', authRouter);
v1MainRouter.use('/', publicRouter);
