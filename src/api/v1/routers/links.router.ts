import { Request, Response, Router } from 'express';
import { validateAccessToken } from '../middlewares/validate-access-token.middleware';
import { LinksService } from '../services/links.service';
import { generateErrorResponse } from '../utilities/generate-error-response.utility';
import { Link } from '../models/link.model';

export const linksRouter: Router = Router();

const linksService = new LinksService();

linksRouter.get('/', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Link[] = await linksService.findAll(request.query);

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred.', error);
  }
});

linksRouter.get('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Link | null = await linksService.findById(parseInt(request.params.id));

    if (!result) {
      generateErrorResponse(response, 404, 'Link not found.');

      return;
    }

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred.', error);
  }
});

linksRouter.post('/', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Link = await linksService.create(request.body);

    response.status(201).json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred creating the Link.', error);
  }
});

linksRouter.put('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Link | undefined = await linksService.update(parseInt(request.params.id), request.body);

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred updating the Link.', error);
  }
});

linksRouter.delete('/:id', validateAccessToken, async (request: Request, response: Response) => {
  try {
    const result: Link[] = await linksService.delete(parseInt(request.params.id));

    response.json(result);
  } catch (error) {
    generateErrorResponse(response, 500, 'An error occurred deleting the Link.', error);
  }
});
