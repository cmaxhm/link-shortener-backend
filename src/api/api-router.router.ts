import cors from 'cors';
import e, { Express } from 'express';
import { publicRouter } from './public/routers/public.router';
import { v1MainRouter } from './v1/routers/index.router';

export function apiMainRouter(app: Express): void {
  app.use(e.json());
  app.use(cors());
  app.use('/', publicRouter);
  app.use('/api/v1', v1MainRouter);
}
