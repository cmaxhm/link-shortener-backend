import { Response } from 'express';

/**
 * Generates an error response.
 *
 * @param response The response object from express.
 * @param statusCode The status code to send.
 * @param errorMessage The error message to send.
 * @param error The error object to send.
 */
export function generateErrorResponse(response: Response, statusCode: number, errorMessage: string, error?: unknown): Response {
  return response.status(statusCode).json({
    statusCode,
    errorMessage,
    error
  });
}
