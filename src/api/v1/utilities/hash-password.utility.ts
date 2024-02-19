import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 *
 * @param password The password in plain text to hash.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}