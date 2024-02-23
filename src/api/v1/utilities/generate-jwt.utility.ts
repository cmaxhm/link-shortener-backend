import jwt from 'jsonwebtoken';
import { JwtResponse } from '../interfaces/jwt-response.interface';

/**
 * Generate JWT.
 *
 * @param payload The payload to include in the JWT.
 */
export function generateJwt(payload: any): JwtResponse {
  return {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    token: jwt.sign(
      payload,
      process.env.API_SECRET_KEY!,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    )
  };
}
