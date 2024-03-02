import { Request, Response, Router } from 'express';
import { Link } from '../../v1/models/link.model';
import { generateErrorResponse } from '../../v1/utilities/generate-error-response.utility';
import { PublicService } from '../services/public.service';

export const publicRouter: Router = Router();

const publicService = new PublicService();

publicRouter.get('/:link_slug', async (req: Request, res: Response) => {
  try {
    const result: Link | null = await publicService.findLinkBySlug(req.params.link_slug);

    if (!result) {
      generateErrorResponse(res, 404, 'Link not found.');

      return;
    }

    res.redirect(result.url!);
  } catch (error) {
    generateErrorResponse(res, 500, 'An error occurred.', error);
  }
});
