import { Router } from 'express';
import { authRouter } from './auth.router';
import { linksRouter } from './links.router';
import { usersRouter } from './users.router';

export const v1MainRouter: Router = Router();

v1MainRouter.use('/users', usersRouter);
v1MainRouter.use('/links', linksRouter);
v1MainRouter.use('/auth', authRouter);
