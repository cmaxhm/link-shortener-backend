import { Request, Response, Router } from 'express';
import { UserData } from '../interfaces/user-data.interface';
import { validateAccessToken } from '../middlewares/validate-access-token.middleware';
import { generateErrorResponse } from '../utilities/generate-error-response.utility';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

export const usersRouter: Router = Router();

const usersService = new UsersService();

usersRouter.get('/', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: User[] = await usersService.findAll();

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred.', error);
  }
});

usersRouter.get('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: User | null = await usersService.findById(parseInt(request.params.id));

    if (!result) {
      generateErrorResponse(response, 404, 'User not found.');

      return;
    }

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred.', error);
  }
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const result: User = await usersService.create(request.body);

    response.status(201).json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred creating the User.', error);
  }
});

usersRouter.put('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Partial<UserData> | undefined = await usersService.update(parseInt(request.params.id), request.body);

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred updating the User.', error);
  }
});

usersRouter.delete('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: User[] = await usersService.delete(parseInt(request.params.id));

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred deleting the User.', error);
  }
});
