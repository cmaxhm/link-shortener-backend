import cors from 'cors';
import e, { Express } from 'express';
import { v1MainRouter } from './v1/routers/index.router';

export function apiMainRouter(app: Express): void {
  app.use(e.json());
  app.use(cors());
  app.use('/api/v1', v1MainRouter);
}