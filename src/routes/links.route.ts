import { Request, Response, Router } from 'express';
import { addLink } from "../controllers/links.controller";
import { ErrorResponseInterface } from "../interfaces/error-response.interface";
import { Link } from "../interfaces/link.interface";

export const router: Router = Router();

router.get('/:linkId', (req: Request, res: Response): void => {

});

router.post('/', (req: Request, res: Response): void => {
  if (req.body.url) {
    addLink(req.body.url).then((response: Link) => {
      res.json(response);
    });
  } else {
    const error: ErrorResponseInterface = {
      message: req.body.url
    };

    res.json(error);
  }
});

// router.delete('/:linkId', (req: Request, res: Response): void => {
//
// });
