import { Request, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';
import { generateErrorResponse } from '../utilities/generate-error-response.utility';

export const authRouter: Router = Router();

const authService = new AuthService();

authRouter.post('/', async (req: Request, res: Response) => {
  const userResult = await authService.login(req.body);

  if (!userResult) {
    generateErrorResponse(res, 401, 'Invalid credentials.');

    return;
  }

  res.json(userResult);
});
