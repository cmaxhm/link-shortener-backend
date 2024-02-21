import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utilities/generate-error-response.utility';

/**
 * Validates the access token.
 *
 * @param request The request object from express.
 * @param response The response object from express.
 * @param next The next function from express.
 */
export function validateAccessToken(request: Request, response: Response, next: NextFunction): void {
  const accessToken = request.headers.authorization;

  if (accessToken) {
    jwt.verify(accessToken, process.env.API_SECRET_KEY!, (error: jwt.VerifyErrors | null) => {
      return error ? generateErrorResponse(response, 401, 'Unauthorized.') : next();
    });
  } else {
    generateErrorResponse(response, 401, 'Unauthorized.');
  }
}
