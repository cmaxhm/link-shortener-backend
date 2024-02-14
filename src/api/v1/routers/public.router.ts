import { Request, Response, Router } from 'express';

export const publicRouter: Router = Router();

publicRouter.get('/:link_slug', (req: Request, res: Response): void => {});
